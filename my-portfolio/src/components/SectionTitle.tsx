// src/components/SectionTitle.tsx
export default function SectionTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h2 className="text-center text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-8 md:mb-10">
      {children}
    </h2>
  );
}
