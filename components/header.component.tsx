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
        <div className="flex items-center">
          <div className="float-right">
            {!!session ? <LogoutButton/> : <LoginButton/>}
          </div>
        </div>
      </header>
    </>
  );
}
