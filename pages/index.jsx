import MainForm from "../components/views/home/MainForm";
import AppShell from "../components/layouts/AppShell";

export default function Home() {
  return (
    <AppShell title="Welcome">
      <MainForm/>
    </AppShell>
  )
}
