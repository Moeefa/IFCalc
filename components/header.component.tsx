import { authOptions } from '@/lib/auth';
import { getServerSession } from "next-auth";
import { 
  LoginButton,
  LogoutButton,
} from '@/components/buttons.component';

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="fixed w-full top-full bg-blue-200 backdrop-blur">
      <div className="float-right">
        {!!session ? <LogoutButton/> : <LoginButton/>}
      </div>
    </header>
  );
}
