import Input from '@/components/Input'
import { useCallback, useState } from 'react'
import axios from 'axios'
import { getSession, signIn } from 'next-auth/react'

import { FcGoogle } from 'react-icons/fc'
import { useRouter } from 'next/router'
import { NextPageContext } from 'next'

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context)

    if (session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props: {}
    }
}

export default function Auth() {
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const [variant, setVariant] = useState('login')

    const togggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login')
    }, [])

    const login = useCallback(async () => {
        try {
            await signIn('credentials', {
                email,
                password,
                redirect: false,
                callbackUrl: `${process.env.NEXTAUTH_URL}/profiles`,
            })

            router.push('/profiles')
        } catch (error) {
            console.log(error)
        }
    }, [email, password, router])

    const register = useCallback(async () => {
        try {
            await axios.post('/api/register', {
                email,
                name,
                password
            })

            login()
        } catch (error) {
            console.log(error)
        }
    }, [email, name, password, login])


    return (
        <div className="relative h-full w-full bg-[url('/images/classic-movie.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className='hidden md:block bg-black w-full h-full bg-opacity-85 pt-10'>
                {/* <nav className='px-12 py-5'>
                    <img src="/images/logo.png" alt="Logo" className='h-12'/>
                </nav> */}
                <div className='flex justify-center'>
                    <div className='bg-black bg-opacity-70 px-16 py-2 self-center  mb-10 lg:w-2/5 lg:max-w-md rounded-md w-full'>

                        <div className='flex items-center mb-1 py-3  justify-center'>
                            <img src="/images/logo.png" alt="Logo" className='h-12' />
                        </div>
                        <h2 className='text-white text-4xl mb-8 font-semibold text-center'>
                            {variant === 'login' ? 'Entre e Assista' : 'Crie sua conta e assista'}
                        </h2>
                        <div className='flex flex-col gap-4'>
                            {variant === 'register' &&
                                <Input
                                    label="Nome"
                                    onChange={(e: any) => setName(e.target.value)}
                                    id="name"
                                    value={name}
                                />
                            }

                            <div className='hidden md:block'>
                                <Input
                                    label='Email'
                                    onChange={(e: any) => setEmail(e.target.value)}
                                    id='email'
                                    type='email'
                                    value={email}
                                />
                            </div>

                            <div className='hidden md:block'><Input
                                label='Senha'
                                onChange={(e: any) => setPassword(e.target.value)}
                                id='password'
                                type='password'
                                value={password}
                            /></div>

                        </div>
                        <button
                            onClick={variant === 'login' ? login : register}
                            className='hidden md:block bg-yellow-600 py-3 text-white rounded-md w-full mt-6 hover:bg-red-700 transition'
                        >
                            {variant === 'login' ? 'Entrar e assistir' : 'Começar a assistir'}
                        </button>
                        <div className='text-white text-sm mt-5 font-semibold text-center'>
                            <h3>Clique abaixo e comece a assistir</h3>
                        </div>
                        <div className='flex flex-row items-center gap-4 mt-8 justify-center'>
                            <div
                                onClick={() => signIn('google', { callbackUrl: '/profiles' })}
                                className='
                                    w-20
                                    h-20
                                    bg-white
                                    rounded-full
                                    flex
                                    items-center
                                    justify-center
                                    cursor-pointer
                                    hover:opacity-80
                                    transition
                                '
                            >

                                <FcGoogle size={40} />
                            </div>

                        </div>

                        <p className='text-neutral-500 mt-8 mb-4'>
                            {variant === 'login' ? 'Primeira vez usando o Vovô Cine?' : 'Já tem uma conta?'}
                            <span
                                onClick={togggleVariant}
                                className='text-white ml-1 hover:underline cursor-pointer'
                            >
                                {variant === 'login' ? 'Clique aqui e crie sua conta' : 'Entrar e Assistir'}
                            </span>
                        </p>


                    </div>
                </div>
            </div>
            <div className="md:hidden flex items-center justify-center h-screen bg-[url('/images/classic-movie.jpg')]  bg-cover bg-center bg-fixed">
                <div className='bg-black bg-opacity-90 px-16 py-24 rounded-md'>
                    <div className='flex flex-col items-center justify-center space-y-4'>
                        <img src="/images/logo.png" alt="Logo" className='h-12 mb-4' />
                        <h2 className='text-white text-4xl font-semibold'>
                            {variant === 'login' ? 'Entre e Assista' : 'Crie sua conta e assista'}
                        </h2>
                        <div className='w-full mt-8'>
                            <div
                                onClick={() => signIn('google', { callbackUrl: '/profiles' })}
                                className='
                                    w-90
                                    mt-5
                                    h-20
                                    bg-white
                                    rounded-full
                                    flex
                                    items-center
                                    justify-center
                                    px-3
                                    cursor-pointer
                                    hover:opacity-80
                                    transition
                                '
                            >

                                <div className='flex mr-2'><FcGoogle size={40} /> </div>
                                <div className='text-black text-2xl mr-2 mt-1 mb-2 font-semibold'>Clique aqui</div>
                            </div>
                            <div className='mt-5 justify-center'>
                                <span
                                    className='flex
                                    items-center
                                    justify-center text-white  hover:underline cursor-pointer text-center '
                                >
                                    Clique no botão acima e  assista
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

