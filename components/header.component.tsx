import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { Navbar } from '@nextui-org/react';
import { 
  LoginButton,
  LogoutButton,
} from '@/components/buttons.component';

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <>      
      <Navbar>
        {/*<div className="float-right">*/}
          {!!session ? <LogoutButton/> : <LoginButton/>}
        {/*</div>*/}
      </Navbar>
    </>
  );
}
