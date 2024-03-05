import styled from "styled-components";
import { CogIconFilled } from "../../assets/svg/CogFilledIcon";
import { motion } from "framer-motion";
import { CogIcon } from "../../assets/svg/CogIcon";

interface ISettingsButtonProps {
  isDarkMode: boolean;
}

const cog1 = {
  darkMode: { rotate: -150 },
  lightMode: { rotate: 0 },
};

const cog2 = {
  darkMode: { rotate: 0, y: -10 },
  lightMode: { rotate: -270, y: -10 },
};

export const SettingsButton = (props: ISettingsButtonProps) => {
  return (
    <Container>
      <AnimateCog
        variants={cog1}
        initial={false}
        animate={props.isDarkMode ? "darkMode" : "lightMode"}
        transition={{ duration: 1 }}
        style={{ scale: 0.7, top: "1px" }}
      >
        <CogIcon />
      </AnimateCog>

      <AnimateCog
        variants={cog2}
        initial={false}
        animate={props.isDarkMode ? "darkMode" : "lightMode"}
        transition={{ duration: 1 }}
        style={{ scale: 0.35, left: "-14px", top: "4px" }}
      >
        <CogIconFilled />
      </AnimateCog>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 55px;
  min-width: 55px;
  padding-left: 15px;
`;
const AnimateCog = styled(motion.div)`
  width: 30px;
  height: 30px;
`;
