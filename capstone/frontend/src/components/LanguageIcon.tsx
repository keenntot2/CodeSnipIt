import {
  SiPython,
  SiCsharp,
  SiCplusplus,
  SiRuby,
  SiSwift,
  SiPhp,
  SiTypescript,
  SiRust,
  SiHtml5,
  SiCss3,
  SiGnubash,
  SiScala,
  SiDart,
  SiPerl,
} from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io5";
import { FaJava, FaRProject } from "react-icons/fa";
import { FaGolang, FaDatabase } from "react-icons/fa6";
import { TbBrandKotlin } from "react-icons/tb";

import { ComponentWithAs, Icon, IconProps } from "@chakra-ui/react";
import { IconType } from "react-icons";
import MatlabIcon from "../icons/MatlabIcon";

const languageIconObject: {
  [k: string]: IconType | ComponentWithAs<"svg", IconProps>;
} = {
  python: SiPython,
  javascript: IoLogoJavascript,
  java: FaJava,
  csharp: SiCsharp,
  cpp: SiCplusplus,
  ruby: SiRuby,
  swift: SiSwift,
  kotlin: TbBrandKotlin,
  php: SiPhp,
  typescript: SiTypescript,
  go: FaGolang,
  rust: SiRust,
  html: SiHtml5,
  css: SiCss3,
  sql: FaDatabase,
  matlab: MatlabIcon,
  r: FaRProject,
  shell: SiGnubash,
  perl: SiPerl,
  scala: SiScala,
  dart: SiDart,
};

const LanguageIcon = ({ language }: { language: string }) => {
  return <Icon as={languageIconObject[language]} />;
};

export default LanguageIcon;
