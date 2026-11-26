import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import {
  AccessibilityInfo, Animated, Easing, Image, Modal, Platform, Pressable,
  ScrollView, StyleSheet, Text, View, type GestureResponderEvent, type ViewProps,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { SkeuoButton } from "./skeuo-button";
import { useFeedback, useSkeuo } from "./theme";

export type PhotoItem = {
  uri: string;
  title: string;
  caption?: string;
  imageAlt?: string;
  label?: string;
  meta?: string;
  description?: string;
};

const printColors = {
  light: { paper: "#faf9f5", ink: "#45423b", edge: "#c4c2ba", base: "#d6d4ca", highlight: "#fff" },
  dark: { paper: "#272728", ink: "#d0cfca", edge: "#555456", base: "#111214", highlight: "#ffffff1e" },
};

export function SkeuoPhotoCarousel({
  items,
  label = "Photo collection",
}: {
  items: PhotoItem[];
  label?: string;
}) {
  const { colors: c, dark } = useSkeuo();
  const feedback = useFeedback();
  const [position, setPosition] = useState(0);
  const [stageWidth, setStageWidth] = useState(0);
  const [record, setRecord] = useState<PhotoItem | null>(null);
  const [reduceMotion, setReduceMotion] = useState(true);
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const mouseSwipe = useRef<{ x: number; y: number; pointerId: number } | null>(null);
  const index = Math.min(position, Math.max(0, items.length - 1));
  const item = items[index];
  const print = dark ? printColors.dark : printColors.light;

  useEffect(() => {
    let mounted = true;
    AccessibilityInfo.isReduceMotionEnabled().then((value) => {
      if (mounted) setReduceMotion(value);
    }).catch(() => {});
    const subscription = AccessibilityInfo.addEventListener("reduceMotionChanged", setReduceMotion);
    return () => {
      mounted = false;
      subscription.remove();
    };
  }, []);

  function select(next: number) {
    const target = Math.min(Math.max(0, next), items.length - 1);
    if (target === index) return;
    feedback();
    setPosition(target);
  }

  function startSwipe({ nativeEvent }: GestureResponderEvent) {
    swipe.current = { x: nativeEvent.pageX, y: nativeEvent.pageY };
    return false;
  }

  function horizontalDelta({ nativeEvent }: GestureResponderEvent) {
    const start = swipe.current;
    if (!start || mouseSwipe.current || nativeEvent.touches.length > 1) return 0;
    const dx = nativeEvent.pageX - start.x;
    const dy = nativeEvent.pageY - start.y;
    return Math.abs(dx) > Math.abs(dy) * 1.2 ? dx : 0;
  }

  function finishSwipe(event: GestureResponderEvent) {
    const dx = horizontalDelta(event);
    swipe.current = null;
    if (Math.abs(dx) >= 40) select(index + (dx < 0 ? 1 : -1));
  }

  // React Native Web forwards DOM pointer events to View.
  const mouseHandlers = Platform.OS === "web" ? {
    onPointerDown(event: PointerEvent<HTMLElement>) {
      if (event.pointerType === "mouse" && event.button === 0) {
        mouseSwipe.current = { x: event.clientX, y: event.clientY, pointerId: event.pointerId };
      }
    },
    onPointerMove(event: PointerEvent<HTMLElement>) {
      const start = mouseSwipe.current;
      if (!start || start.pointerId !== event.pointerId) return;
      const dx = event.clientX - start.x;
      const dy = event.clientY - start.y;
      if (Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy) * 1.2 && !event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.setPointerCapture(event.pointerId);
      }
    },
    onPointerUp(event: PointerEvent<HTMLElement>) {
      const start = mouseSwipe.current;
      mouseSwipe.current = null;
      if (!start || start.pointerId !== event.pointerId || !event.currentTarget.hasPointerCapture(event.pointerId)) return;
      const dx = event.clientX - start.x;
      const dy = event.clientY - start.y;
      if (Math.abs(dx) >= 40 && Math.abs(dx) > Math.abs(dy) * 1.2) {
        select(index + (dx < 0 ? 1 : -1));
      }
    },
    onPointerCancel() {
      mouseSwipe.current = null;
    },
  } as unknown as Pick<ViewProps, "onPointerDown" | "onPointerMove" | "onPointerUp" | "onPointerCancel"> : {};

  function handleKey(event: KeyboardEvent<HTMLElement>) {
    if (record || (event.key !== "ArrowLeft" && event.key !== "ArrowRight")) return;
    event.preventDefault();
    select(index + (event.key === "ArrowLeft" ? -1 : 1));
  }

  if (!item) return <Text style={{ color: c.muted }}>No photos yet.</Text>;

  const firstDot = Math.max(0, Math.min(index - 2, items.length - 5));
  const printCount = Math.min(items.length, 5);
  const printsToLeft = Math.floor((printCount - 1) / 2);

  return (
    <View style={styles.album} {...Platform.select({ web: { onKeyDown: handleKey } })}>
      <View style={styles.heading}>
        <Text accessibilityRole="header" style={[styles.headingText, { color: c.ink }]}>{label}</Text>
        <Text
          accessibilityLiveRegion="polite"
          aria-live="polite"
          style={[styles.mono, { color: c.muted }]}
        >
          {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </Text>
      </View>
      <View
        {...mouseHandlers}
        onLayout={(event) => setStageWidth(event.nativeEvent.layout.width)}
        onStartShouldSetResponderCapture={startSwipe}
        onMoveShouldSetResponderCapture={(event) => Math.abs(horizontalDelta(event)) > 12}
        onResponderRelease={finishSwipe}
        onResponderTerminate={() => { swipe.current = null; }}
        style={[styles.stage, { position: "relative", ...Platform.select({ web: { touchAction: "pan-y" } }) }]}
      >
        {Array.from({ length: printCount }, (_, i) => {
          const offset = i - printsToLeft;
          const photoIndex = (index + offset + items.length) % items.length;
          const photo = items[photoIndex];
          return <PhotoPrint
            key={`${photoIndex}:${photo.uri}`}
            photo={photo}
            offset={offset}
            stageWidth={stageWidth}
            reduceMotion={reduceMotion}
            palette={print}
            onPress={() => photoIndex === index ? setRecord(photo) : select(photoIndex)}
          />;
        })}
      </View>
      <View style={styles.caption}>
        <View style={styles.captionText}>
          <Text style={[styles.title, { color: c.ink }]}>{item.title}</Text>
          {item.caption && <Text style={[styles.summary, { color: c.muted }]}>{item.caption}</Text>}
        </View>
        <SkeuoButton accessibilityLabel={`More info about ${item.title}`} onPress={() => setRecord(item)}>
          <Text style={[styles.mono, { color: c.ink }]}>More info ↗</Text>
        </SkeuoButton>
      </View>
      {items.length > 1 && (
        <View style={styles.controls}>
          <AlbumArrow direction="previous" disabled={index === 0} onPress={() => select(index - 1)} />
          <View style={styles.dots}>
            {items.slice(firstDot, firstDot + 5).map((photo, i) => {
              const target = firstDot + i;
              const active = index === target;
              return (
                <Pressable
                  key={target}
                  accessibilityRole="button"
                  accessibilityLabel={`Show ${photo.title}`}
                  accessibilityState={{ selected: active }}
                  aria-selected={active}
                  onPress={() => select(target)}
                  style={styles.dotTarget}
                >
                  <View style={[styles.dot, { width: active ? 18 : 6, backgroundColor: active ? c.accent : print.edge }]} />
                </Pressable>
              );
            })}
          </View>
          <AlbumArrow direction="next" disabled={index === items.length - 1} onPress={() => select(index + 1)} />
        </View>
      )}
      {record && (
        <Modal transparent animationType={reduceMotion ? "none" : "fade"} visible onRequestClose={() => setRecord(null)}>
          <View style={styles.backdrop}>
            <Pressable accessible={false} importantForAccessibility="no" onPress={() => setRecord(null)} style={StyleSheet.absoluteFill} />
            <View accessibilityViewIsModal style={[styles.record, { backgroundColor: c.raised, borderColor: c.edge }]}>
              <ScrollView bounces={false} contentContainerStyle={styles.recordContent}>
                <View style={styles.heading}>
                  <Text accessibilityRole="header" style={[styles.title, styles.captionText, { color: c.ink }]}>{record.title}</Text>
                  <SkeuoButton onPress={() => setRecord(null)} accessibilityLabel="Close photo details">
                    <Text style={[styles.mono, { color: c.ink }]}>Close ×</Text>
                  </SkeuoButton>
                </View>
                <Image
                  source={{ uri: record.uri }}
                  alt={record.imageAlt ?? record.title}
                  resizeMode="contain"
                  style={[styles.recordImage, { backgroundColor: c.well, borderColor: c.base }]}
                />
                {(record.description ?? record.caption) && (
                  <Text style={[styles.summary, { color: c.muted }]}>{record.description ?? record.caption}</Text>
                )}
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

function PhotoPrint({
  photo, offset, stageWidth, reduceMotion, palette: p, onPress,
}: {
  photo: PhotoItem;
  offset: number;
  stageWidth: number;
  reduceMotion: boolean;
  palette: typeof printColors.light;
  onPress: () => void;
}) {
  const { colors: c } = useSkeuo();
  const [focused, setFocused] = useState(false);
  const [motion] = useState(() => new Animated.Value(offset));
  const active = offset === 0;

  useEffect(() => {
    if (reduceMotion) {
      motion.setValue(offset);
      return;
    }
    const animation = Animated.timing(motion, {
      toValue: offset,
      duration: 450,
      easing: Easing.bezier(0.22, 0.65, 0.3, 1),
      useNativeDriver: Platform.OS !== "web",
    });
    animation.start();
    return () => animation.stop();
  }, [offset, motion, reduceMotion]);

  return (
    <Animated.View style={[styles.printPosition, {
      zIndex: 3 - Math.abs(offset),
      transform: [
        { translateX: motion.interpolate({ inputRange: [-2, -1, 0, 1, 2], outputRange: [-0.15, -0.12, 0, 0.12, 0.15].map((part) => part * stageWidth) }) },
        { rotate: motion.interpolate({ inputRange: [-2, -1, 0, 1, 2], outputRange: ["-12deg", "-6deg", "-1.5deg", "6deg", "12deg"] }) },
        { scale: motion.interpolate({ inputRange: [-2, -1, 0, 1, 2], outputRange: [0.8, 0.9, 1, 0.9, 0.8] }) },
      ],
    }]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={active ? `View ${photo.title} photo details` : `Bring ${photo.title} photo forward`}
        onPress={onPress}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={[styles.print, {
          backgroundColor: p.paper,
          borderColor: focused ? c.accent : p.edge,
          boxShadow: `inset 0 1px ${p.highlight}, inset 0 -2px ${p.base}, 0 3px ${p.base}, 0 4px ${p.edge}, ${active ? "0 14px 24px #00000055" : "0 9px 16px #00000038"}`,
        }]}
      >
        <View pointerEvents="none" style={[styles.imageFrame, { backgroundColor: c.well, borderColor: p.edge }]}>
          <Image
            source={{ uri: photo.uri }}
            alt={photo.imageAlt ?? photo.title}
            resizeMode="cover"
            style={StyleSheet.absoluteFill}
          />
          <View pointerEvents="none" style={[StyleSheet.absoluteFill, { boxShadow: "inset 0 4px 7px #00000055, inset 0 -1px #ffffff20" }]} />
        </View>
        <View style={styles.printFooter}>
          <Text numberOfLines={1} style={[styles.mono, styles.captionText, { color: active ? c.accent : p.ink }]}>{photo.label ?? photo.title}</Text>
          {photo.meta && <Text style={[styles.mono, { color: p.ink }]}>{photo.meta}</Text>}
        </View>
      </Pressable>
    </Animated.View>
  );
}

function AlbumArrow({ direction, disabled, onPress }: {
  direction: "previous" | "next";
  disabled: boolean;
  onPress: () => void;
}) {
  const { colors: c, dark } = useSkeuo();
  const [focused, setFocused] = useState(false);
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={direction === "previous" ? "Previous photo" : "Next photo"}
      accessibilityState={{ disabled }}
      aria-disabled={disabled}
      disabled={disabled}
      onPress={onPress}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={({ pressed }) => [styles.arrow, {
        borderColor: focused ? c.accent : c.edge,
        backgroundColor: dark ? "#292a29" : "#f9f9f7",
        boxShadow: pressed ? "inset 0 2px 3px #00000025" : `0 2px ${c.base}, 0 3px ${c.edge}`,
        opacity: disabled ? 0.45 : 1,
        transform: [{ translateY: pressed ? 2 : 0 }],
      }]}
    >
      <Svg width={16} height={16} viewBox="0 0 20 20" accessible={false}>
        <Path
          d={direction === "previous" ? "m11 5-5 5 5 5M6 10h10" : "m9 5 5 5-5 5M14 10H4"}
          stroke={c.ink} strokeWidth={1.4} fill="none"
        />
      </Svg>
    </Pressable>
  );
}

const mono = Platform.select({ ios: "Menlo", android: "monospace", web: "monospace" });
const styles = StyleSheet.create({
  album: { width: "100%", maxWidth: 520, alignSelf: "center", gap: 12 },
  heading: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 },
  headingText: { fontSize: 17, fontWeight: "500", flexShrink: 1 },
  mono: { fontFamily: mono, fontSize: 10 },
  stage: { width: "100%", aspectRatio: 1.12, justifyContent: "center" },
  printPosition: { position: "absolute", left: "10%", right: "10%" },
  print: { padding: 7, paddingBottom: 0, borderWidth: 1, borderRadius: 5 },
  imageFrame: { aspectRatio: 4 / 3, borderWidth: 1, borderRadius: 2, overflow: "hidden" },
  printFooter: { flexDirection: "row", justifyContent: "space-between", gap: 8, paddingVertical: 11, paddingHorizontal: 2 },
  caption: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10 },
  captionText: { flex: 1, minWidth: 0 },
  title: { fontSize: 17, fontWeight: "500", letterSpacing: -0.35 },
  summary: { fontSize: 12, lineHeight: 18, marginTop: 4 },
  controls: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 4 },
  dots: { flexDirection: "row", alignItems: "center" },
  dotTarget: { width: 24, height: 44, alignItems: "center", justifyContent: "center" },
  dot: { height: 6, borderRadius: 6 },
  arrow: { width: 44, height: 44, borderRadius: 22, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  backdrop: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000000a0", padding: 16 },
  record: { width: "100%", maxWidth: 520, maxHeight: "90%", borderWidth: 1, borderRadius: 12, overflow: "hidden" },
  recordContent: { padding: 16, gap: 12 },
  recordImage: { width: "100%", aspectRatio: 4 / 3, borderWidth: 5, borderRadius: 4 },
});
