import logo from '@/assets/theoryy-logo.png';

const Footer = () => {
  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
        <img src={logo} alt="Theoryy" className="h-8 opacity-70" />
        <p className="text-sm text-muted-foreground">
          © 2026 Theoryy. Practically Balanced Nutrition.
        </p>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          <a href="#" className="hover:text-foreground transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
