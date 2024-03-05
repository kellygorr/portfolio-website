import {
  IProject,
  FileType,
  TagType,
  ToolType,
  SectionName,
  HighlightName,
  SkillType,
} from "../IProject";

const thumbnail = "malaria.jpg";
const thumbnail2 = "malaria-pdf.jpg";

const img1 =
  import.meta.env.VITE_IMAGE_URL_SRC +
  "assets/images/malaria-infographic/large4a.jpg";
const pdf =
  import.meta.env.VITE_IMAGE_URL_SRC +
  "assets/images/malaria-infographic/research_based_design.pdf";

export const malariaInfographic: IProject = {
  details: {
    header: "Malaria Infographic",
    thumbnail: thumbnail,
    tags: [TagType.Infographic],
  },
  content: [
    {
      slideshow: {
        width: 1250,
        slides: [
          {
            img: img1,
          },
        ],
      },
    },
    {
      header: SectionName.Overview,
      body: "Malaria infographic design.",
    },
    {
      header: SectionName.Details,
      highlight: [
        {
          header: HighlightName.Skills,
          tags: [SkillType.Design],
        },
        {
          header: HighlightName.Tools,
          tags: [ToolType.Illustrator],
        },
      ],
    },
    {
      header: "Project Statement",
      attachments: [
        {
          header: "Research Based Design PDF",
          thumbnail: thumbnail2,
          file: {
            type: FileType.Pdf,
            source: pdf,
          },
        },
      ],
    },
  ],
};
