#!/usr/bin/env python3
"""Render the original Reel concept walkthrough into a local MP4.

Requires rsvg-convert and ffmpeg. Uses only Python's standard library.
"""

from __future__ import annotations

import concurrent.futures
import html
import math
import os
import subprocess
import tempfile
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public/templates/reel-demo.mp4"
POSTER = ROOT / "public/templates/reel-poster-v2.svg"
FPS = 24
SECONDS = 16
WIDTH = 1280
HEIGHT = 720


def rect(x, y, width, height, fill, radius=0, stroke=None, stroke_width=1, opacity=1):
    border = f' stroke="{stroke}" stroke-width="{stroke_width}"' if stroke else ""
    return f'<rect x="{x}" y="{y}" width="{width}" height="{height}" rx="{radius}" fill="{fill}" opacity="{opacity}"{border}/>'


def circle(x, y, radius, fill, opacity=1):
    return f'<circle cx="{x}" cy="{y}" r="{radius}" fill="{fill}" opacity="{opacity}"/>'


def line(x1, y1, x2, y2, stroke, width=1, opacity=1):
    return f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{stroke}" stroke-width="{width}" opacity="{opacity}"/>'


def text(x, y, value, size=16, color="#f2f5ff", weight=400, anchor="start", spacing=None, opacity=1):
    letter = f' letter-spacing="{spacing}"' if spacing is not None else ""
    return f'<text x="{x}" y="{y}" fill="{color}" opacity="{opacity}" font-family="Rubik, Noto Sans, sans-serif" font-size="{size}" font-weight="{weight}" text-anchor="{anchor}"{letter}>{html.escape(value)}</text>'


def cursor(x, y, click=False):
    ring = circle(x + 4, y + 4, 18, "#a5bdff", .22) if click else ""
    return ring + f'<path d="M{x} {y} L{x+1} {y+24} L{x+7} {y+17} L{x+13} {y+29} L{x+18} {y+26} L{x+12} {y+15} L{x+22} {y+14} Z" fill="#f7f9ff" stroke="#18233d" stroke-width="2"/>'


def shell(title, active):
    items = ["Recordings", "Studio", "Shared"]
    y_positions = [250, 308, 366]
    out = [
        rect(0, 0, WIDTH, HEIGHT, "#0b1020"),
        circle(1100, 20, 360, "#263c7a", .18),
        circle(40, 750, 420, "#4763a5", .10),
        rect(64, 44, 1152, 632, "#111827", 20, "#455472", 2),
        rect(64, 44, 1152, 48, "#202a42", 20),
        rect(64, 72, 1152, 20, "#202a42"),
        circle(88, 68, 5, "#94aff6"), circle(104, 68, 5, "#687797"), circle(120, 68, 5, "#687797"),
        text(640, 73, f"reel / {title}", 13, "#aebcda", anchor="middle"),
        rect(64, 92, 210, 584, "#151e31"),
        text(96, 151, "reel.", 32, "#f4f6ff", 700),
        text(96, 186, "YOUR WORKSPACE", 10, "#8d9cba", 500, spacing=1.6),
        rect(274, 92, 1, 584, "#3b4966"),
    ]
    for item, y in zip(items, y_positions):
        selected = item == active
        if selected:
            out.append(rect(83, y - 31, 172, 44, "#2c3d69", 7))
            out.append(rect(83, y - 31, 3, 44, "#9ab7ff", 2))
        out.append(circle(104, y - 9, 5, "#a1b7ec" if selected else "#657591"))
        out.append(text(120, y - 4, item, 14, "#f4f6ff" if selected else "#9ca9c3", 500 if selected else 400))
    out.extend([rect(84, 607, 170, 44, "#1d2840", 7, "#374562"), text(101, 635, "DEMO WORKSPACE", 11, "#b7c4de", 500)])
    return out


def record_scene(t):
    local = t
    started = local > 1.05
    seconds = max(0, int(local - 1.05))
    out = shell("capture", "Recordings")
    out.extend([
        text(318, 135, "A good explanation starts here.", 28, "#f6f8ff", 600),
        text(319, 168, "Capture the moment while it is still fresh.", 14, "#9baac6"),
        rect(318, 194, 822, 342, "#19233a", 13, "#3f5073"),
        rect(340, 216, 778, 298, "#263452", 8),
        rect(372, 246, 380, 234, "#18233a", 10, "#61739d"),
        text(400, 282, "THE NEW ONBOARDING FLOW", 11, "#a5b9e3", 600, spacing=1.4),
        text(400, 339, "Make the first", 36, "#f8faff", 650),
        text(400, 383, "minute count.", 36, "#f8faff", 650),
        rect(400, 418, 152, 30, "#91b1ff", 6),
        text(476, 439, "Get started", 12, "#14213b", 600, anchor="middle"),
        rect(777, 246, 304, 112, "#304163", 9),
        text(802, 283, "A clearer first step", 17, "#f0f4ff", 600),
        text(802, 313, "One action at a time", 12, "#abb9d3"),
        rect(777, 373, 304, 107, "#304163", 9),
        text(802, 411, "Less to learn at once", 17, "#f0f4ff", 600),
        text(802, 441, "More room to explore", 12, "#abb9d3"),
        rect(318, 554, 822, 82, "#172137", 10, "#3e4c68"),
    ])
    if started:
        pulse = .55 + .45 * math.sin(local * 7) ** 2
        out.extend([circle(352, 592, 8, "#ff6a67", pulse), text(370, 598, f"RECORDING  00:{seconds:02d}", 13, "#f4f6ff", 600, spacing=1)])
        for i in range(33):
            h = 9 + 22 * abs(math.sin(i * .76 + local * 7)) * abs(math.cos(i * .21 + local))
            out.append(rect(555 + i * 13, 603 - h / 2, 7, h, "#98b5fb", 2, opacity=.5 + .5 * abs(math.sin(i * .31 + local))))
        out.append(rect(1040, 570, 77, 42, "#e65f5f", 7))
        out.append(text(1078, 596, "Stop", 13, "#ffffff", 600, anchor="middle"))
        out.append(cursor(744 + 95 * math.sin(local * 1.6), 337 + 65 * math.cos(local * 1.2)))
    else:
        out.extend([rect(900, 567, 217, 52, "#9ab7ff", 8), circle(931, 593, 7, "#e65f5f"), text(1011, 600, "Start recording", 14, "#152544", 650, anchor="middle")])
        out.append(cursor(835 + 170 * local, 600 - 4 * local, click=local > .8))
    return out


def edit_scene(t):
    local = t - 5
    out = shell("studio", "Studio")
    out.extend([
        text(318, 135, "Keep the part worth watching.", 28, "#f6f8ff", 600),
        text(319, 168, "A light edit makes the story clearer.", 14, "#9baac6"),
        rect(318, 192, 570, 315, "#202d49", 11, "#465b82"),
        rect(340, 214, 526, 271, "#1a243a", 7),
        text(368, 258, "Product update", 13, "#9ab2e4", 550),
        text(368, 320, "A simpler first", 42, "#f3f6ff", 650),
        text(368, 371, "step for everyone.", 42, "#f3f6ff", 650),
        rect(369, 408, 245, 36, "#a2bafb", 5),
        text(490, 432, "See what changed", 13, "#182847", 600, anchor="middle"),
        rect(908, 192, 232, 315, "#18243a", 11, "#3b4c6d"),
        text(931, 225, "TRANSCRIPT", 10, "#a5b7d9", 600, spacing=1.4),
        line(931, 240, 1118, 240, "#374967"),
        text(931, 278, "We made the first", 13, "#f3f6ff"),
        text(931, 302, "step much simpler.", 13, "#f3f6ff"),
        text(931, 351, "Now the essentials", 13, "#9aaacd"),
        text(931, 375, "are right here.", 13, "#9aaacd"),
        text(931, 440, "Captions on", 12, "#9fb6ef"),
        rect(319, 529, 821, 107, "#172137", 10, "#3e4c68"),
        text(341, 553, "STORY TIMELINE", 10, "#93a4c4", 600, spacing=1.1),
    ])
    for i in range(4):
        x = 343 + i * 186
        out.append(rect(x, 568, 172, 47, "#334b78" if i == 1 else "#2a3b5c", 5, "#7796d4" if i == 1 else "#4b5d80"))
        out.append(text(x + 12, 597, ["Opening", "What changed", "Walkthrough", "Next step"][i], 11, "#e0e8fc"))
    playhead = 343 + min(local / 5, 1) * 730
    out.extend([line(playhead, 561, playhead, 622, "#aac5ff", 3), circle(playhead, 561, 5, "#aac5ff"), cursor(playhead + 15, 566 + 7 * math.sin(local * 2))])
    return out


def share_scene(t):
    local = t - 10
    copied = local > 2.7
    out = shell("share", "Shared")
    out.extend([
        text(318, 135, "Send the story, not just a file.", 28, "#f6f8ff", 600),
        text(319, 168, "One clear link keeps everything together.", 14, "#9baac6"),
        rect(365, 199, 730, 407, "#253554", 15, "#748cba"),
        rect(387, 221, 686, 363, "#1b2944", 10),
        circle(441, 272, 27, "#96b1f3"),
        text(441, 279, "R", 23, "#17294a", 700, anchor="middle"),
        text(486, 266, "The new onboarding flow", 26, "#f5f7ff", 650),
        text(486, 296, "A quick walkthrough for the whole team", 13, "#a6b8d7"),
        line(419, 328, 1042, 328, "#465b80"),
        text(419, 366, "SHARE LINK", 10, "#a6b8d7", 600, spacing=1.4),
        rect(419, 385, 623, 60, "#111c33", 8, "#50658d"),
        text(440, 421, "reel.app/r/onboarding-flow", 17, "#e0e8fc", 500),
        rect(916, 393, 115, 44, "#a0bafd" if not copied else "#b3d7bc", 6),
        text(973, 421, "Copy link" if not copied else "Copied", 13, "#172b4c", 600, anchor="middle"),
        text(419, 490, "Anyone with this link can watch", 13, "#a7b7d5"),
        circle(432, 535, 17, "#d2a98e"), circle(461, 535, 17, "#90acc2"), circle(490, 535, 17, "#a5b988"),
        text(530, 541, "Ready for your team", 14, "#eef2ff", 500),
    ])
    x = 780 + min(local / 2.3, 1) * 185
    y = 500 - min(local / 2.3, 1) * 90
    out.append(cursor(x, y, click=2.2 < local < 2.6))
    if copied:
        out.extend([rect(837, 470, 198, 46, "#d0e6cc", 8), text(936, 499, "Link copied", 14, "#1a3524", 600, anchor="middle")])
    return out


def closing_scene(t):
    local = t - 14
    fade = min(local / .45, 1)
    out = [rect(0, 0, WIDTH, HEIGHT, "#0d1425"), circle(640, 360, 350, "#273b6e", .35), circle(640, 360, 260, "#6c91d2", .08)]
    out.extend([
        circle(640, 275, 25, "#a4bdff", fade),
        text(640, 405, "reel.", 106, "#f4f6ff", 700, anchor="middle", opacity=fade),
        text(640, 463, "Show the work. Keep the nuance.", 22, "#b7c5df", 400, anchor="middle", opacity=fade),
    ])
    return out


def frame_svg(t):
    if t < 5:
        content = record_scene(t)
    elif t < 10:
        content = edit_scene(t)
    elif t < 14:
        content = share_scene(t)
    else:
        content = closing_scene(t)
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{WIDTH}" height="{HEIGHT}" viewBox="0 0 {WIDTH} {HEIGHT}">' + "".join(content) + "</svg>"


def render_frame(job):
    index, directory = job
    svg = frame_svg(index / FPS)
    output = Path(directory) / f"{index:04d}.png"
    subprocess.run(["rsvg-convert", "-w", str(WIDTH), "-h", str(HEIGHT), "-o", str(output)], input=svg.encode(), check=True)


def main():
    POSTER.parent.mkdir(parents=True, exist_ok=True)
    POSTER.write_text(frame_svg(6.3), encoding="utf-8")
    with tempfile.TemporaryDirectory(prefix="reel-frames-") as directory:
        with concurrent.futures.ThreadPoolExecutor(max_workers=min(8, os.cpu_count() or 4)) as pool:
            list(pool.map(render_frame, ((i, directory) for i in range(FPS * SECONDS))))
        subprocess.run([
            "ffmpeg", "-y", "-hide_banner", "-loglevel", "error",
            "-framerate", str(FPS), "-i", str(Path(directory) / "%04d.png"),
            "-c:v", "libx264", "-preset", "medium", "-crf", "19",
            "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an", str(OUTPUT),
        ], check=True)
    print(f"Wrote {OUTPUT}")


if __name__ == "__main__":
    main()
