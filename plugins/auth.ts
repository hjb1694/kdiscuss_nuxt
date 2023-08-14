export default defineNuxtPlugin(async (nuxtApp) => {

    let isLoggedIn = useState<boolean>('isLoggedIn', () => false);
    let accountName = useState<string | null>('accountName', () => null);

    const register = async (account_type: string, dob: string, account_name: string, email: string, password: string) => {

        try{

            await $fetch('/api/auth/register', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json', 
                    'Accept': 'application/json'
                }, 
                body: {
                    account_type,
                    dob, 
                    account_name, 
                    email, 
                    password
                }
            });

            isLoggedIn.value = true;
            accountName.value = account_name;

        }catch(e){
            console.error(e);
            throw e;
        }

        
    }


    return {
        provide: {
            auth: {
                isLoggedIn, 
                accountName, 
                register
            }
        }
    }



});