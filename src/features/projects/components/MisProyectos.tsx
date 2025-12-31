import { useCallback } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom';
import React from 'react';
import { useMisProyectosQuery } from '../hooks/useMisProyectosQuery';
import { useEliminarProyecto } from '../hooks/useEliminarProyecto';
import Spinner from '@/components/spinner/Spinner';

function MisProyectos() {

  const { data, isLoading } = useMisProyectosQuery()

  const { mutate } = useEliminarProyecto()

  const handleDelete = useCallback((idDto: number) => {
    mutate(idDto);
  }, [mutate]);

  const ProjectMenu = React.memo(({ id, onDelete }: { id: number; onDelete: (id: number) => void }) => (
    <Menu as="div" className="relative flex-none">
      <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
        <span className="sr-only">opciones</span>
        <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
      </MenuButton>
      <MenuItems
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
      >
        <MenuItem>
          <Link to={`/UpTask/${id}`}
            className='block px-3 py-1 text-sm leading-6 text-gray-900'>
            Ver Proyecto
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to={`/UpTask/${id}/edit`}
            className='block px-3 py-1 text-sm leading-6 text-gray-900'>
            Editar Proyecto
          </Link>
        </MenuItem>
        <MenuItem>
          <button
            type='button'
            className='block px-3 py-1 text-sm leading-6 text-red-500'
            onClick={() => onDelete(id)}
          >
            Eliminar Proyecto
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  ));

  return (
    <>
      <div>MisProyectos</div>
      {isLoading ? (
        <Spinner />
      ) : (
        data && data.data && data.data.length ? (
          <ul role="list" className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg">
            {data.data.map((project) => (
              <li key={project.idDto} className="flex justify-between gap-x-6 px-5 py-10">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto space-y-2">
                    <Link to={`/UpTask/${project.idDto}`}
                      className="text-gray-600 cursor-pointer hover:underline text-3xl font-bold"
                    >{project.projectNameDto}</Link>
                    <p className="text-sm text-gray-400">
                      Cliente: {project.clientNameDto}
                    </p>
                    <p className="text-sm text-gray-400">
                      {project.descriptionDto}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-x-6">
                  <ProjectMenu id={project.idDto} onDelete={handleDelete} />
                </div>
              </li>
            ))}
          </ul>
        ) : <p>Sin proyectos</p>
      )}
    </>
  );
}
export default MisProyectos