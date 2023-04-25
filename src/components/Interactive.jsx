import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const Interactive = () => {

    const options = {
        fullScreen:{
            enable:false,
            zIndex:0,
          },
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              area: 800
            }
          },
          color: {
            value: ["#2EB67D", "#ECB22E", "#E01E5B", "#36C5F0","#645CBB","#30E3DF","#BFDB38","#FC7300","#6F1AB6","#0014FF","#fff","red"]
          },
          shape: {
            type: "circle"
          },
          opacity: {
            value: 0.8
          },
          size: {
            value: { min: 1, max: 15 }
          },
          links: {
            enable: false,
            distance: 200,
            color: "#fff",
            opacity: 1,
            width: 1
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            outModes: "out"
          }
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab"
            },
            onClick: {
              enable: false,
              mode: "push"
            }
          },
          modes: {
            grab: {
              distance: 140,
              links: {
                opacity: 1
              }
            },
            push: {
              quantity: 4
            }
          },
          
        }
      };
    
    const particlesInit = useCallback(async (engine) => {
        await loadFull(engine);
      }, []);

    return(
        <Particles options={options} init={particlesInit} />
    );
};
export default Interactive;
