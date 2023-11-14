import React from 'react'

export default function Connection() {
  return (
    <div class="flex min-h-screen lg:items-center lg:justify-center bg-gray-50">
      <div class="rounded-lg bg-gray-50 shadow-xl px-16 py-16 lg:w-6/12">
        <div class="flex flex-col">
          <h3 class="my-4 text-center text-3xl font-semibold text-black">
            Connexion
          </h3>
          <form  className="max-w-md mt-5 mx-auto">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-600 text-sm font-medium mb-1"
            >
             E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="border border-gray-300 bg-gray-200 rounded-md text-dark w-100 focus:outline-none p-2 mr-2"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-gray-600 text-sm font-medium mb-1"
            >
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              // value={formData.address}
              // onChange={handleChange}
              className="border border-gray-300 bg-gray-200 rounded-md text-dark w-100 focus:outline-none p-2 mr-2"
              required
            />
        </div>
      </form>
          <button class="mx-auto my-10 block rounded-xl border-4 border-transparent bg-gray-900 px-6  text-center text-base font-medium text-white w-56 hover:bg-gray-800 hover:duration-300">
            Se connecter
          </button>
          <p class="text-sm font-light text-gray-500 dark:text-gray-400">
            Vous n'avez pas de compte ?{" "}
            <a
              href="#"
              class="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Inscrivez-vous !
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
