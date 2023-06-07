import { authOptions } from '@/lib/auth';
import { getServerSession } from "next-auth";
import { 
  LoginButton,
  LogoutButton,
} from '@/components/buttons.component';

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <>      
      <header className="fixed w-full h-10 top-0 bg-blue-100 backdrop-blur">
        <div className="float-right flex items-center">
          {!!session ? <LogoutButton/> : <LoginButton/>}
        </div>
      </header>
    </>
  );
}
