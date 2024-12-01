import Logo from "./logo";
import Typography from "../ui/typography";

export default function Footer() {
  return (
    <footer>
      <div className="flex items-center justify-center gap-4">
        <Logo />
        <Typography variant="h2">Powered by Aptos</Typography>
      </div>
    </footer>
  );
}
