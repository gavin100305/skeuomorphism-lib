export type ComponentGuide = { example: string; notes: string };
export const componentGuides: Record<string, ComponentGuide> = {
  "button": {
    "example": "\"use client\";\n\nimport { SkeuoButton } from \"@/components/ui/skeuo-button\";\n\nexport function Example() {\n  return (\n    <SkeuoButton variant=\"primary\" onClick={() => console.log(\"Saved\")}>\n      Save changes\n    </SkeuoButton>\n  );\n}",
    "notes": "Use variant=\"primary\" for the accent treatment; size and square control dimensions. Native button props are forwarded. Use type=\"submit\" inside a form when appropriate."
  },
  "theme-button": {
    "example": "\"use client\";\n\nimport { useState } from \"react\";\nimport { SkeuoThemeButton } from \"@/components/ui/skeuo-theme-button\";\n\nexport function Example() {\n  const [theme, setTheme] = useState<\"light\" | \"dark\">(\"light\");\n  return (\n    <div data-theme={theme}>\n      <SkeuoThemeButton theme={theme} onThemeChange={setTheme} />\n      <p>This scope follows the selected theme.</p>\n    </div>\n  );\n}",
    "notes": "This is a controlled button. Your app owns theme persistence and document classes. The example applies a local data-theme scope; connect onThemeChange to your existing theme controller for a site-wide change. variant=\"round\" changes the shape; lightIcon and darkIcon replace the built-in icons."
  },
  "keyboard-button": {
    "example": "import { SkeuoKeyButton } from \"@/components/ui/skeuo-key-button\";\n\nexport function Example() {\n  return (\n    <SkeuoKeyButton tone=\"accent\" icon={<span aria-hidden=\"true\">R</span>}>\n      React\n    </SkeuoKeyButton>\n  );\n}",
    "notes": "tone=\"accent\" follows the theme tokens; \"neutral\" and \"cobalt\" are alternatives. Supply your own icon ReactNode or omit it. No technology logos are downloaded."
  },
  "switch": {
    "example": "\"use client\";\n\nimport { useState } from \"react\";\nimport { SkeuoSwitch } from \"@/components/ui/skeuo-switch\";\n\nexport function Example() {\n  const [enabled, setEnabled] = useState(false);\n  return (\n    <SkeuoSwitch checked={enabled} onCheckedChange={setEnabled}\n      aria-label=\"Enable notifications\" />\n  );\n}",
    "notes": "Keep checked in your application state. Supply an accessible name and pass disabled to prevent interaction. No storage or preferences are managed by the switch."
  },
  "input": {
    "example": "import { SkeuoInput } from \"@/components/ui/skeuo-input\";\n\nexport function Example() {\n  return (\n    <label>Email address\n      <SkeuoInput type=\"email\" name=\"email\" placeholder=\"you@example.com\" />\n    </label>\n  );\n}",
    "notes": "All native input props are supported. Connect labels and helper text using id, htmlFor, and aria-describedby. Set aria-invalid when your own validation finds an error."
  },
  "textarea": {
    "example": "import { SkeuoTextarea } from \"@/components/ui/skeuo-input\";\n\nexport function Example() {\n  return (\n    <label>Message\n      <SkeuoTextarea name=\"message\" rows={4} placeholder=\"Your message\" />\n    </label>\n  );\n}",
    "notes": "Input and textarea share one registry item and stylesheet. rows sets the initial height; native textarea props are forwarded."
  },
  "slider": {
    "example": "\"use client\";\n\nimport { useState } from \"react\";\nimport { SkeuoSlider } from \"@/components/ui/skeuo-slider\";\n\nexport function Example() {\n  const [volume, setVolume] = useState(50);\n  return (\n    <SkeuoSlider value={volume} onValueChange={setVolume}\n      min={0} max={100} step={5} aria-label=\"Volume\" />\n  );\n}",
    "notes": "The slider is controlled. Set min, max, and step for your range; use aria-valuetext when the numeric value needs a unit or human-readable meaning."
  },
  "section-dock": {
    "example": "\"use client\";\n\nimport { useState } from \"react\";\nimport { SkeuoSectionDock } from \"@/components/ui/skeuo-section-dock\";\n\nexport function Example() {\n  const [section, setSection] = useState(\"home\");\n  return (\n    <SkeuoSectionDock value={section} onValueChange={setSection}\n      orientation=\"horizontal\" items={[\n        { value: \"home\", label: \"Home\", icon: <span aria-hidden=\"true\">H</span> },\n        { value: \"work\", label: \"Work\", icon: <span aria-hidden=\"true\">W</span> },\n      ]} />\n  );\n}",
    "notes": "Use vertical or horizontal orientation. Supply labeled icons and a value matching an item. onValueChange only reports the selected value: your app owns scrolling or navigation."
  },
  "tabs": {
    "example": "\"use client\";\n\nimport { useState } from \"react\";\nimport { SkeuoTabs } from \"@/components/ui/skeuo-tabs\";\n\nexport function Example() {\n  const [tab, setTab] = useState(\"design\");\n  return (\n    <SkeuoTabs value={tab} onValueChange={setTab} label=\"Workflow\"\n      appearance=\"keys\" colorMode=\"alternating\" items={[\n        { value: \"design\", label: \"Design\", content: <p>Plan your interface.</p> },\n        { value: \"build\", label: \"Build\", content: <p>Build your interface.</p> },\n      ]} />\n  );\n}",
    "notes": "appearance=\"segmented\" is the default. Use \"keys\" for mechanical buttons and colorMode=\"alternating\" for alternate key colors. Each item needs a unique value; disabled items are skipped by keyboard navigation."
  },
  "surface": {
    "example": "import { SkeuoSurface } from \"@/components/ui/skeuo-surface\";\n\nexport function Example() {\n  return (\n    <SkeuoSurface variant=\"recessed\">\n      <h2>Your content</h2>\n      <p>Compose your own interface here.</p>\n    </SkeuoSurface>\n  );\n}",
    "notes": "Use raised or recessed. Pass className and native div attributes to compose your own layout. A surface has no interaction or semantics beyond its div."
  },
  "project-card": {
    "example": "\"use client\";\n\nimport { SkeuoProjectCard } from \"@/components/ui/skeuo-project-card\";\n\nexport function Example() {\n  return (\n    <SkeuoProjectCard title=\"Landscape study\" number=\"01\"\n      image=\"/images/landscape.jpg\" imageAlt=\"Mountains reflected in a lake\"\n      onOpen={() => console.log(\"Open project details\")} />\n  );\n}",
    "notes": "Add your own image file at the example path or replace its URL. Without onOpen the card is an article; with onOpen it is a button. children can replace the image area."
  },
  "id-card": {
    "example": "import { SkeuoIDCard } from \"@/components/ui/skeuo-id-card\";\n\nexport function Example() {\n  return (\n    <SkeuoIDCard name=\"Alex Morgan\" role=\"Designer\" code=\"AM / 01\"\n      heading=\"MEMBER ACCESS\"\n      portrait={<img src=\"/images/portrait.jpg\" alt=\"Alex Morgan\" />} />\n  );\n}",
    "notes": "Replace the example portrait path with your own asset, or pass any ReactNode as portrait. Name, role, heading, and code are replaceable; no portfolio art is installed."
  },
  "contribution-calendar": {
    "example": "import { SkeuoContributionCalendar } from \"@/components/ui/skeuo-contribution-calendar\";\n\nexport function Example() {\n  return (\n    <SkeuoContributionCalendar days={[\n      { date: \"2026-01-01\", count: 4, level: 2 },\n      { date: \"2026-01-02\", count: 8, level: 4 },\n      { date: \"2026-01-03\", count: 0, level: 0 },\n    ]} />\n  );\n}",
    "notes": "Supply date strings as YYYY-MM-DD, nonnegative counts, and levels from 0 to 4. Use mobile={true} for the compact presentation. Fetch and normalize GitHub data in your application; no API request or credentials are bundled."
  },
  "contact-form": {
    "example": "\"use client\";\n\nimport { SkeuoContactForm } from \"@/components/ui/skeuo-contact-form\";\n\nexport function Example() {\n  return (\n    <SkeuoContactForm onSend={async (values) => {\n      const response = await fetch(\"/api/contact\", {\n        method: \"POST\",\n        headers: { \"Content-Type\": \"application/json\" },\n        body: JSON.stringify(values),\n      });\n      if (!response.ok) throw new Error(\"Send failed\");\n    }} />\n  );\n}",
    "notes": "Implement /api/contact or replace the callback with your own service. Resolve onSend only when delivery succeeds; throw on failure. Keep credentials on your server. The labels prop replaces field labels, placeholders, buttons, and feedback messages."
  },
  "experience-tabs": {
    "example": "\"use client\";\n\nimport { useState } from \"react\";\nimport { SkeuoExperienceTabs } from \"@/components/ui/skeuo-experience-tabs\";\n\nexport function Example() {\n  const [active, setActive] = useState(\"studio\");\n  return (\n    <SkeuoExperienceTabs value={active} onValueChange={setActive}\n      colorMode=\"alternating\" items={[\n        { id: \"studio\", label: \"Studio\", role: \"Product Designer\",\n          period: \"2024–present\", description: \"Designing useful interfaces.\",\n          technologies: [\"React\", \"Figma\"] },\n        { id: \"product\", label: \"Product\", role: \"Frontend Developer\",\n          period: \"2022–2024\", description: \"Building accessible products.\",\n          technologies: [\"TypeScript\", \"CSS\"] },\n      ]} />\n  );\n}",
    "notes": "Supply unique record IDs matching the selected value. Replace role, period, description, and technologies with your own data. colorMode=\"alternating\" varies the key colors; \"same\" is the default."
  },
  "focus-timer": {
    "example": "import { SkeuoFocusTimer } from \"@/components/ui/skeuo-focus-timer\";\n\nexport function Example() {\n  return (\n    <SkeuoFocusTimer duration={25 * 60} heading=\"FOCUS SESSION\"\n      badge=\"01\" labels={{ start: \"Begin\", pause: \"Pause\", reset: \"Reset\" }} />\n  );\n}",
    "notes": "duration is the starting time in seconds, clamped to 1–60 minutes. Drag the rim clockwise to increase the duration or anticlockwise to decrease it in one-minute steps. Adjusting pauses the countdown; Start begins the new duration and Reset restores the last selected duration. Arrow keys adjust by one minute, Page Up/Down by five; Home/End select the limits. Replace heading, badge, and labels (including adjust and hint). To apply a new starting duration after mount, remount the timer with a different React key."
  },
  "testimonial-carousel": {
    "example": "import { SkeuoTestimonialCarousel } from \"@/components/ui/skeuo-testimonial-carousel\";\n\nexport function Example() {\n  return (\n    <SkeuoTestimonialCarousel label=\"Customer feedback\" items={[\n      { id: \"one\", quote: \"Replace this with real customer feedback.\",\n        author: \"Customer name\", role: \"Designer\", initials: \"CN\" },\n      { id: \"two\", quote: \"Another customer quote belongs here.\",\n        author: \"Another customer\", role: \"Developer\", initials: \"AC\" },\n    ]} />\n  );\n}",
    "notes": "Supply real, approved quotes with unique IDs. Hover and focus pause movement; reduced motion shows a static horizontal list. All content and attribution belong to the caller."
  },
  "photo-carousel": {
    "example": "import { SkeuoPhotoCarousel } from \"@/components/ui/skeuo-photo-carousel\";\n\nexport function Example() {\n  return (\n    <SkeuoPhotoCarousel label=\"Travel photographs\" autoPlay={false} items={[\n      { id: \"lake\", image: \"/images/lake.jpg\", imageAlt: \"A mountain lake\",\n        title: \"Quiet mornings\", label: \"01\", meta: \"2026\",\n        eyebrow: \"FIELD NOTES\", subtitle: \"A moment of stillness\",\n        description: \"A short story about this photograph.\" },\n      { id: \"city\", image: \"/images/city.jpg\", imageAlt: \"City architecture\",\n        title: \"New perspectives\", label: \"02\" },\n    ]} />\n  );\n}",
    "notes": "Add your own photos at the example paths or replace the URLs. Each item needs a unique ID, image, imageAlt, title, and label. Optional fields populate the detail dialog. autoPlay defaults to true; set it to false to disable automatic advancement."
  },
  "provider": {
    "example": "import { SkeuoProvider } from \"@/components/ui/skeuo-provider\";\nimport { SkeuoButton } from \"@/components/ui/skeuo-button\";\n\nexport function Example() {\n  return (\n    <SkeuoProvider theme=\"dark\" fontFamily=\"system-ui, sans-serif\"\n      style={{ \"--primary\": \"#365e50\", \"--primary-foreground\": \"#ffffff\" }}>\n      <SkeuoButton variant=\"primary\">Save</SkeuoButton>\n    </SkeuoProvider>\n  );\n}",
    "notes": "The provider is optional. Install the button separately for this example. Use standard semantic CSS tokens globally on :root/.dark, or supply them through the typed style prop for a local palette. Complete CSS colors (hex, rgb(), hsl(), oklch()) are supported. Highlights and depth derive from the palette. Explicit --sk-* overrides take precedence for fine control. The provider never writes document classes or storage. Its wrapper uses display: contents; put layout styles on a surrounding element."
  },
  "sound-provider": {
    "example": "\"use client\";\nimport { SkeuoSoundProvider } from \"@/components/ui/skeuo-sound-provider\";\nimport { SkeuoButton } from \"@/components/ui/skeuo-button\";\n\nexport function Example() {\n  return (\n    <SkeuoSoundProvider enabled onSound={(phase) => {\n      // Supply your own audio file and user preference.\n      if (phase === \"down\") {\n        const audio = new Audio(\"/sounds/click.wav\");\n        void audio.play().catch(() => {});\n      }\n    }}>\n      <SkeuoButton>With sound</SkeuoButton>\n      <SkeuoButton data-sk-sound=\"off\">Silent</SkeuoButton>\n    </SkeuoSoundProvider>\n  );\n}",
    "notes": "Install the button separately for this example. Supply your own click file at the example path or replace the callback. Sound is disabled by default; connect enabled to a user-controlled preference. onSound receives down/up phases and an activation index. No audio files, network requests, document-wide event listeners, or storage settings are installed. data-sk-sound=\"off\" opts a control out."
  }
};
