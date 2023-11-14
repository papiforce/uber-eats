import React from 'react'

export default function Connection() {
  return (
    <div class="flex min-h-screen items-center justify-center bg-gray-100">
      <div class="rounded-lg bg-gray-50 shadow-xl px-16 py-16 w-6/12">
        <div class="flex flex-col">
            <h3 class="my-4 text-center text-3xl font-semibold text-black">Connexion</h3>
            <form class="space-y-4 md:space-y-6" action="#">
                <div>
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mail</label>
                    <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                </div>
                <div>
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de passe</label>
                    <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                </div>
            </form>
            <button class="mx-auto my-10 block rounded-xl border-4 border-transparent bg-gray-900 px-6 py-3 text-center text-base font-medium text-white w-32 hover:bg-gray-800 hover:duration-300">Se connecter</button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                 Vous n'avez pas de compte ? <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Inscrivez-vous !</a>
            </p>
        </div>
      </div>
    </div>  )
}
