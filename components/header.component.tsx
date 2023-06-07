import { authOptions } from '@/lib/auth';
import { 
  LoginButton,
  LogoutButton,
} from '@/components/buttons.component';

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header>
      <div className="float-right">
        {!!session ? <LogoutButton/> : <LoginButton/>}
      </div>
    </header>
  );
}
