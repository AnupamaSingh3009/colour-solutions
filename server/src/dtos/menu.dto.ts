interface MenuDto {
  categories: string[];
  pages: PageMenu[];
}

interface PageMenu {

  link: string;

  title: string;
}