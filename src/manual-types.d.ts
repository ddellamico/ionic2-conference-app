/*
 * Custom Type Definitions
 */

// Extra variables that live on Global that will be replaced by webpack DefinePlugin
declare let __DEV__: boolean;

// Ionic
interface PageObj {
  title: string;
  component: any;
  icon: string;
  index?: number;
}

interface Slide {
  title: string;
  description: string;
  image: string;
}
