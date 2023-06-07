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
      <h2>Teste2!</h2>
      
      {!!session ? <LogoutButton/> : <LoginButton/>}

      <header className="fixed w-full h-10 top-0 bg-blue-200 backdrop-blur">
        <div className="float-right">
          {!!session ? <h1>Teste3</h1> : <h1>Teste3</h1>}
        </div>
      </header>
    </>
  );
}
