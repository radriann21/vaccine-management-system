import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: { value: "#4A5568" },
        softBlue: { value: "#5B8DBE" },
        softRed: { value: "#E57373" },
        softOrange: { value: "#FF9F66" },
        softGreen: { value: "#81C784" },
        softPurple: { value: "#9575CD" },
        softAmber: { value: "#FFD54F" }
      }
    }
  }
})

export const system = createSystem(defaultConfig, config)