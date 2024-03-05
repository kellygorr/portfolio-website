import {
  IProject,
  FileType,
  SkillType,
  HighlightName,
  SectionName,
} from "../IProject";
import { TagType } from "../IProject";

const thumbnail = "quizzes.jpg";

const img1 =
  import.meta.env.VITE_IMAGE_URL_SRC + "assets/images/xbox-quizzes/quiz7.png";
const img2 =
  import.meta.env.VITE_IMAGE_URL_SRC + "assets/images/xbox-quizzes/quiz8.jpg";
const img3 =
  import.meta.env.VITE_IMAGE_URL_SRC + "assets/images/xbox-quizzes/quiz4.jpg";
const img4 =
  import.meta.env.VITE_IMAGE_URL_SRC + "assets/images/xbox-quizzes/quiz22.jpg";
const img5 =
  import.meta.env.VITE_IMAGE_URL_SRC + "assets/images/xbox-quizzes/quiz11.jpg";
const img6 =
  import.meta.env.VITE_IMAGE_URL_SRC + "assets/images/xbox-quizzes/quiz14.png";
const img7 =
  import.meta.env.VITE_IMAGE_URL_SRC + "assets/images/xbox-quizzes/quiz13.png";
const img8 =
  import.meta.env.VITE_IMAGE_URL_SRC + "assets/images/xbox-quizzes/quiz9.png";

const img9 =
  import.meta.env.VITE_IMAGE_URL_SRC +
  "assets/images/xbox-quizzes/gotquiz4.jpg";
const img10 =
  import.meta.env.VITE_IMAGE_URL_SRC +
  "assets/images/xbox-quizzes/gotquiz2.jpg";
const img11 =
  import.meta.env.VITE_IMAGE_URL_SRC +
  "assets/images/xbox-quizzes/gotquiz3.jpg";

const video1 =
  import.meta.env.VITE_IMAGE_URL_SRC + "assets/videos/fifaQuiz.mp4";
const video2 =
  import.meta.env.VITE_IMAGE_URL_SRC + "assets/videos/gameofthronesquiz.mp4";

export const xboxQuizzes: IProject = {
  details: {
    header: "Xbox Quizzes",
    thumbnail: thumbnail,
    tags: [TagType.Xbox, TagType.Template, TagType.Quiz],
  },
  content: [
    {
      slideshow: {
        width: 1250,
        slides: [
          {
            img: img1,
            caption: "Fifa 16 quiz",
            file: {
              type: FileType.Video,
              source: video1,
            },
          },
          {
            img: img2,
            caption: "Witcher 3: Four choice quiz",
          },
          {
            img: img3,
            caption: "World Cup Quiz: Five choice quiz",
          },
          {
            img: img4,
            caption:
              "South Park Quiz: Five choice quiz with multiple sounds for right/wrong answers",
          },
          {
            img: img5,
            caption: "Witcher 3 Quiz: User got the question incorrect",
          },
          {
            img: img6,
            caption: "Daredevil Quiz: User got the question correct",
          },
          {
            img: img7,
            caption: "World Cup Quiz: Results page",
          },
          {
            img: img8,
            caption:
              "Tomb Raider Quiz: Results page with community performance",
          },
        ],
      },
    },
    {
      header: SectionName.Overview,
      body: "Quizzes on the Xbox One are very popular promotional tools, because they consistently have high user engagement.  Quizzes run as stand-alone promotions or in combination with larger projects (where they still preform very well).",
    },
    {
      header: SectionName.Role,
      body: "I was tasked with building a quiz template (plugin) that would be used to customize and run Xbox quizzes.  The intro page, question section, and results page were completely customizable, and options included video backgrounds, different result page layouts, and a vertical button layout.  The text fields for the body copy and buttons were flexible enough to accommodate varying text lengths so that a quiz could be translated into multiple languages without having to adjust the layout.",
    },
    {
      header: SectionName.Details,
      highlight: [
        {
          header: HighlightName.Platform,
          tags: [TagType.Xbox],
        },
        {
          header: HighlightName.Dates,
          body: "March 29, 2015",
        },
        {
          header: HighlightName.Skills,
          tags: [SkillType.JQuery, SkillType.HTML, SkillType.CSS],
        },
        {
          header: HighlightName.Designer,
          body: "Xbox Programing Team designers",
        },
        {
          header: HighlightName.Engineer,
          body: "Kelly Gorr",
        },
      ],
    },
    { title: "Game of Thrones Quiz" },
    {
      slideshow: {
        width: 1250,
        slides: [
          {
            img: img9,
            file: {
              type: FileType.Video,
              source: video2,
            },
          },
          {
            img: img10,
            caption: "Question section (The answer is Stallion)",
          },
          {
            img: img11,
            caption:
              "The results screen had 6 possible messages and sound clips from previous Game of Thrones seasons, based on the user's score.",
          },
        ],
      },
    },
    {
      header: SectionName.Overview,
      body: "This was the first quiz released by Xbox on the Xbox One.  Between projects I had built a quiz prototype, and since my team focused on user engagement they recognized it would be a great promotional tool.  GOT was the perfect opportunity to use a quiz, and I was chosen to build it.  I coded the quiz and collaborated with the project’s designers on the functionality. The quiz was a big success with 90% of users finishing the quiz and over half of those people replaying it.",
    },
    {
      header: SectionName.Details,
      highlight: [
        {
          header: HighlightName.Platform_Accessories,
          tags: [TagType.Xbox, TagType.Kinect],
        },
        {
          header: HighlightName.Featured_On,
          body: "Xbox One dashboard home page and games section",
        },
        {
          header: HighlightName.Localization,
          tags: ["United States", "Canada (EN-CA)"],
        },
        {
          header: HighlightName.Dates,
          body: "May 2015 - June 2015",
        },
        {
          header: HighlightName.Skills,
          tags: [SkillType.JQuery, SkillType.HTML, SkillType.CSS],
        },
        {
          header: HighlightName.Design_Lead,
          body: "Todd Bohanna",
        },
        {
          header: HighlightName.Designer,
          body: "James Aparis",
        },
        {
          header: HighlightName.Engineer,
          body: "Kelly Gorr",
        },
      ],
    },
  ],
};
