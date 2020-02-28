declare module "*.svg" {
  const content: any;
  export const ReactComponent: React.JSXElementConstructor<{}>;
  export default content;
}

declare module "*.png" {
  const content: any;
  export default content;
}
