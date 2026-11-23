import React, { useState, useRef } from "react";
import { Image, Text, View } from "react-native";
import { SkeuoButton } from "./skeuo-button";
import { useSkeuo } from "./theme";
export type PhotoItem = { uri: string; title: string; caption?: string };
export function SkeuoPhotoCarousel({
  items,
  label = "Photo collection",
}: {
  items: PhotoItem[];
  label?: string;
}) {
  const { colors: c } = useSkeuo();
  const [position, setPosition] = useState(0);
  const touch = useRef({x:0,y:0});
  const index = Math.min(position, Math.max(0, items.length - 1));
  const item = items[index];
  if (!item) return <Text style={{ color: c.muted }}>No photos yet.</Text>;
  return (
    <View accessibilityLabel={label} style={{ gap: 20, paddingTop: 16 }}>
      <View onTouchStart={event => { touch.current = {x:event.nativeEvent.pageX,y:event.nativeEvent.pageY}; }} onTouchEnd={event => { const dx=event.nativeEvent.pageX-touch.current.x; const dy=event.nativeEvent.pageY-touch.current.y; if(Math.abs(dx)>40 && Math.abs(dx)>Math.abs(dy)) setPosition(Math.max(0,Math.min(items.length-1,index+(dx<0?1:-1)))); }} style={{ height: 244, marginHorizontal: 20 }}>
        {[-7, 5].map((rotation, i) => (
          <View
            key={rotation}
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: c.surface,
              borderWidth: 1,
              borderColor: c.edge,
              borderRadius: 3,
              transform: [{ rotate: `${rotation}deg` }],
              margin: 6 + i * 2,
            }}
          />
        ))}
        <View
          style={{
            flex: 1,
            padding: 10,
            paddingBottom: 16,
            backgroundColor: c.raised,
            borderWidth: 1,
            borderColor: c.edge,
            borderBottomWidth: 3,
            gap: 8,
          }}
        >
          <Image
            source={{ uri: item.uri }}
            accessibilityLabel={item.title}
            alt={item.title}
            resizeMode="cover"
            style={{ flex: 1, backgroundColor: c.well }}
          />
          <Text style={{ color: c.ink, fontSize: 15, fontWeight: "600" }}>
            {item.title}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
        }}
      >
        <SkeuoButton
          accessibilityLabel="Previous photo"
          disabled={index === 0}
          onPress={() => setPosition(index - 1)}
        >
          ‹
        </SkeuoButton>
        <Text
          accessibilityLiveRegion="polite"
          style={{ color: c.muted, fontSize: 12 }}
        >
          {index + 1} / {items.length}
        </Text>
        <SkeuoButton
          accessibilityLabel="Next photo"
          disabled={index === items.length - 1}
          onPress={() => setPosition(index + 1)}
        >
          ›
        </SkeuoButton>
      </View>
      {item.caption && (
        <Text style={{ color: c.muted, fontSize: 13, lineHeight: 20 }}>
          {item.caption}
        </Text>
      )}
    </View>
  );
}
