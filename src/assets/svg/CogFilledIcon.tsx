import styled from "styled-components";

// Vite doesn't have any native inline svg support, so we have to use a workaround
export const CogIconFilled = () => {
  return (
    <Wrapper>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 30 30"
      >
        <path
          d="M28.9,16l-2.53-1.81-.54-2.61,1.6-2.67a.48.48,0,0,0,0-.56L24.85,5a.49.49,0,0,0-.53-.18l-3,.85L19,4.5,17.86,1.59a.48.48,0,0,0-.45-.33l-4.2-.09a.5.5,0,0,0-.47.31l-1.2,2.87L9.11,5.46l-3-1a.51.51,0,0,0-.54.16L2.93,7.87a.5.5,0,0,0-.05.56l1.49,2.72-.65,2.59-2.6,1.71A.51.51,0,0,0,.9,16l.85,4.11a.5.5,0,0,0,.41.39L5.22,21l1.62,2.12-.29,3.1a.5.5,0,0,0,.27.49l3.75,1.9a.5.5,0,0,0,.55-.07l2.33-2.07,2.67.06,2.24,2.16a.52.52,0,0,0,.35.14.46.46,0,0,0,.2,0L22.73,27a.49.49,0,0,0,.29-.48l-.16-3.11,1.71-2.05L27.65,21a.48.48,0,0,0,.42-.37l1-4.07A.51.51,0,0,0,28.9,16Z"
          fill="#231f20"
        />
      </svg>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  svg {
    path {
      fill: ${({ theme }) => theme.footerText};
    }
  }
`;
