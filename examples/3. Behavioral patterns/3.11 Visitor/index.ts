import { HTMLGeneratorVisitor, CustomHTML, Head, Body, Title, Div, H1, P, Img } from './classes';
import { assets } from './assets';

const html = new CustomHTML();
const head = new Head({ id: 'html-head' });
const body = new Body({ id: 'app' });
html.addChild(head);
html.addChild(body);

const title = new Title({ content: assets.titles.pageTitle });
head.addChild(title);

const headerDiv = new Div({ cl: 'header-wrapper' });
const contentDiv = new Div({ cl: 'content-wrapper'});
const footerDiv = new Div({ cl: 'footer-wrapper'});
body.addChild(headerDiv);
body.addChild(contentDiv);
body.addChild(footerDiv);

const logoDiv = new Div({ cl: 'logo' });
const navigationDiv = new Div({ cl: 'navigation' });
const logoImg = new Img({ src: assets.links.logo, alt: assets.alts.logo });
const logoText = new P({ cl: 'logo-text', content: assets.texts.logoText });
headerDiv.addChild(logoDiv);
headerDiv.addChild(navigationDiv);
logoDiv.addChild(logoImg);
logoDiv.addChild(logoText);

const navAbout = new P({ cl: 'nav-link', content: 'About' });
const navProducts = new P({ cl: 'nav-link', content: 'Products' });
const navNews = new P({ cl: 'nav-link', content: 'News' });
const navContactUs = new P({ cl: 'nav-link', content: 'Contact us' });
navigationDiv.addChild(navAbout);
navigationDiv.addChild(navProducts);
navigationDiv.addChild(navNews);
navigationDiv.addChild(navContactUs);

const h1 = new H1({ content: assets.titles.h1 });
const p1 = new P({ content: assets.texts.p1 });
const quote = new P({ cl: 'quote', content: assets.texts.quote });
const p2 = new P({ content: assets.texts.p2 });
const galleryDiv = new Div({ id: 'gallery' });
contentDiv.addChild(h1);
contentDiv.addChild(p1);
contentDiv.addChild(quote);
contentDiv.addChild(p2);
contentDiv.addChild(galleryDiv);

const galleryImage1 = new Img({ src: assets.links.img1, alt: assets.alts.img1, cl: 'gallery-item' });
const galleryImage2 = new Img({ src: assets.links.img2, alt: assets.alts.img2, cl: 'attention' });
const galleryImage3 = new Img({ src: assets.links.img3, alt: assets.alts.img3, cl: 'gallery-item' });
galleryDiv.addChild(galleryImage1);
galleryDiv.addChild(galleryImage2);
galleryDiv.addChild(galleryImage3);

const authorInfo = new P({ cl: 'author-info', content: assets.texts.authorInfo });
footerDiv.addChild(authorInfo);


const HTMLGenerator = new HTMLGeneratorVisitor();
html.accept(HTMLGenerator);

const styles = assets.styles.default;
HTMLGenerator.addStyles(styles);

const finalHTML = HTMLGenerator.getHTML();

document.write(finalHTML);
