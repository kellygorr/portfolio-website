import {
  IProject,
  TagType,
  SkillType,
  HighlightName,
  SectionName,
} from "../IProject";

const thumbnail = "calc.jpg";

const img1 =
  import.meta.env.VITE_IMAGE_URL_SRC +
  "assets/images/calculator-tool/itemcalc1.jpg";
const img2 =
  import.meta.env.VITE_IMAGE_URL_SRC +
  "assets/images/calculator-tool/itemcalc2.jpg";
const img3 =
  import.meta.env.VITE_IMAGE_URL_SRC +
  "assets/images/calculator-tool/itemcalc3.jpg";
const img4 =
  import.meta.env.VITE_IMAGE_URL_SRC +
  "assets/images/calculator-tool/itemcalc4.jpg";
const img5 =
  import.meta.env.VITE_IMAGE_URL_SRC +
  "assets/images/calculator-tool/itemcalc5.jpg";
const img6 =
  import.meta.env.VITE_IMAGE_URL_SRC +
  "assets/images/calculator-tool/itemcalc7.jpg";

export const calculatorTool: IProject = {
  details: {
    header: "Calculator Tool",
    thumbnail: thumbnail,
    tags: [TagType.Tooling, TagType.Website],
  },
  content: [
    {
      slideshow: {
        width: 1100,
        slides: [
          {
            img: img1,
          },
          {
            img: img2,
          },
          {
            img: img3,
          },
          {
            img: img4,
            caption: "Items successfully calculated",
          },
          {
            img: img5,
            caption: "One of the error messages",
          },
          {
            img: img6,
            caption: "Some messages from the fish",
          },
        ],
      },
    },
    {
      header: SectionName.Overview,
      body: "This is an internal tool that I designed and built to help calculate/estimate the amount of pop-in items that can be added to the [ <a href='interactive-video-playlist'>interactive video playlist</a> ].  To help navigate the tool I included a ‘fishBot’ guide to give the user feedback, and to show the user an instruction page when clicked.  The tool also has error messaging so that the user includes all the required fields, and more prominent messaging when the user divides be zero or does other impossible calculations. As an unexpected twist for my teammates, I gave the fishBot a bad attitude to add some humor to the calculator.  If the user takes too long on the calculator page, the fish will die from boredom and have to be revived with a click.  Eventually the fishBot will not respond and will no longer help the user.",
    },

    {
      header: SectionName.Details,
      highlight: [
        {
          header: HighlightName.Platform,
          tags: [TagType.Web],
        },
        {
          header: HighlightName.Skills,
          tags: [
            SkillType.Design,
            SkillType.UIUX,
            SkillType.JavaScript,
            SkillType.JQuery,
            SkillType.HTML,
            SkillType.CSS,
          ],
        },
        {
          header: HighlightName.Designer,
          body: "Kelly Gorr",
        },
        {
          header: HighlightName.Engineer,
          body: "Kelly Gorr",
        },
      ],
    },
  ],
};
