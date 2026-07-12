import type { ReactNode } from "react";

type Props = {
  title?: string;
  children: ReactNode;
};

export default function Card({
  title,
  children,
}: Props) {
  return (
    <section className="card">

      {title && (
        <header className="card-title">
          {title}
        </header>
      )}

      <div className="card-content">
        {children}
      </div>

    </section>
  );
}