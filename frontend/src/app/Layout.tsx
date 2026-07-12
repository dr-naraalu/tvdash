import LeftColumn from "../components/layout/LeftColumn";
import CenterColumn from "../components/layout/CenterColumn";
import RightColumn from "../components/layout/RightColumn";

export default function Layout() {
  return (
    <main className="homeos-layout">
      <LeftColumn />
      <CenterColumn />
      <RightColumn />

      <footer className="status-bar">
        HomeOS v0.1
      </footer>
    </main>
  );
}