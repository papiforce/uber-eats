import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function LoadingAnimation() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(() => {}, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "#fafafa",
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#ffffff",
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          move: {
            direction: "bottom-right",
            enable: true,
            outModes: {
              default: "out",
            },
            random: false,
            speed: 10,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 7,
          },

          shape: {
            image: {
              src: "https://cdn-icons-png.flaticon.com/512/3601/3601647.png",
              width: 100,
              height: 100,
            },
            type: "image",
          },
          size: {
            value: { min: 100, max: 100 },
          },
        },
        detectRetina: true,
      }}
    />
  );
}
