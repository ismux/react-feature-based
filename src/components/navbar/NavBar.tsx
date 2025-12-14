/*
  La diferencia entre Link y NavLink es que NavLink tiene un callback
  que permite por ejemplo resaltar la página actual
*/
import { NavLink, useLocation } from 'react-router-dom'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { type ChangeEvent, type FormEvent, useEffect, useMemo, useState } from 'react'
import { SubmitButton } from '../submit/SubmitButton'
import { useAppStore } from '../../stores/useAppStore'
import ErrorMessage from '../error/ErrorMessage'
import Notification from "../notif/Notification"
import { UserLogged } from '../pages/auth/models'
import { useQueryClient } from '@tanstack/react-query'

type NavBarProps = {
    user: UserLogged
}
function NavBar({ user }: NavBarProps) {
    const navigation = [
        { name: 'UpTask', href: '/UpTask', current: false }
    ]

    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ')
    }

    const fetchCategories = useAppStore((state) => state.fetchCategories)
    const categories = useAppStore((state) => state.categories)
    const searchRecipes = useAppStore((state) => state.searchRecipes)
    const showNotification = useAppStore((state) => state.showNotification);

    useEffect(() => {
        //fetchCategories()
    }, [])

    const [searchFilters, setSearchFilters] = useState({
        ingredient: '',
        category: ''
    });
    const [formValid, setFormValid] = useState(true);
    const { pathname } = useLocation();
    const isDriknSearch = useMemo(() => pathname === '/BuscaBebidas', [pathname]);

    const handleChange = (e: ChangeEvent<HTMLInputElement> |
        ChangeEvent<HTMLSelectElement>) => {
        setSearchFilters({
            ...searchFilters,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formValid = !Object.values(searchFilters).includes('');
        setFormValid(formValid)
        if (!formValid) {
            showNotification({
                text: 'Faltan datos requeridos',
                error: true
            });
            return;
        }

        searchRecipes(searchFilters)
    }


    const queryClient = useQueryClient()

    const logout = () => {
        localStorage.removeItem('AWESOME_AUTH_TOKEN')
        queryClient.invalidateQueries({ queryKey: ['userprofile'] })
    }

    return (
        <>
            <Disclosure as="nav" className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {/* Mobile menu button*/}
                            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open main menu</span>
                                <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                            </DisclosureButton>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex shrink-0 items-center">
                                <img
                                    alt="Your Company"
                                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                                    className="h-8 w-auto"
                                />
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    {navigation.map((item) => (
                                        <NavLink to={item.href} key={item.name}
                                            className={({ isActive }) =>
                                                classNames(isActive ? 'bg-gray-900 text-white' :
                                                    'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'rounded-md px-3 py-2 text-sm font-medium')
                                            }>
                                            {item.name}
                                        </NavLink>
                                    ))}

                                </div>

                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <button
                                type="button"
                                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                            >
                                <span className="absolute -inset-1.5" />
                                <span className="sr-only">View notifications</span>
                                Hola, <b>{user.firstNameDto}</b>
                            </button>

                            {/* Profile dropdown */}
                            <Menu as="div" className="relative ml-3">
                                <div>
                                    <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">Open user menu</span>
                                        <img
                                            alt=""
                                            src="https://rickandmortyapi.com/api/character/avatar/655.jpeg"
                                            className="size-8 rounded-full"
                                        />
                                    </MenuButton>
                                </div>
                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                                >
                                    <MenuItem>
                                        <button
                                            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                                            onClick={logout}>
                                            Sign out
                                        </button>
                                    </MenuItem>
                                </MenuItems>
                            </Menu>
                        </div>
                    </div>
                </div>

                <DisclosurePanel className="sm:hidden">
                    <div className="space-y-1 px-2 pt-2 pb-3">
                        {navigation.map((item) => (
                            <DisclosureButton
                                key={item.name}
                                as="a"
                                href={item.href}
                                aria-current={item.current ? 'page' : undefined}
                                className={classNames(
                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                    'block rounded-md px-3 py-2 text-base font-medium',
                                )}>
                                {item.name}
                            </DisclosureButton>
                        ))}
                    </div>
                </DisclosurePanel>
            </Disclosure>

            {isDriknSearch && (
                <form className='md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg
                                shadow space-y-6'
                    onSubmit={handleSubmit}>
                    <div className='space-y-4'>
                        <label htmlFor='ingredient'
                            className='block text-white uppercase'>
                            Nombre o ingredientes
                        </label>
                        <input
                            id='ingredient'
                            name='ingredient'
                            type='text'
                            className='p-3 w-full bg-white rounded-lg'
                            placeholder='Nombre o ingrediente'
                            onChange={handleChange}
                            value={searchFilters.ingredient} />
                    </div>
                    <div className='space-y-4'>
                        <label htmlFor='category'
                            className='block text-white uppercase'>
                            Categoría
                        </label>
                        <select
                            id='category'
                            name='category'
                            className='p-3 w-full bg-white rounded-lg'
                            onChange={handleChange}
                            value={searchFilters.category}>
                            <option>Selecciona</option>
                            {
                                categories &&
                                categories.drinks.map((elem) =>
                                    <option key={elem.strCategory}
                                        value={elem.strCategory}>
                                        {elem.strCategory}
                                    </option>
                                )
                            }
                        </select>
                    </div>
                    {!formValid &&
                        <div className='space-y-4'>
                            <ErrorMessage>Faltan datos requeridos</ErrorMessage>
                        </div>
                    }
                    <SubmitButton value='Buscar' isdisabled={false} />
                </form>
            )}
            <Notification />
        </>
    )
}
export default NavBar