type DocumentPageTitleProps = {
  title: string;
};

export function DocumentPageTitle({ title }: DocumentPageTitleProps) {
  return (
    <h1 className="mb-12 text-[29px] font-bold leading-9 tracking-normal">
      {title}
    </h1>
  );
}
