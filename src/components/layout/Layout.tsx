import { useRouter } from 'next/router';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const getLinkAriaCurrent = (path: string) => {
    return router.pathname === path ? 'page' : undefined;
  };
  return (
    <div>
      <Navbar getLinkAriaCurrent={getLinkAriaCurrent} />
      <main>{children}</main>
      <Footer getLinkAriaCurrent={getLinkAriaCurrent} />
    </div>
  );
};

export default Layout;
