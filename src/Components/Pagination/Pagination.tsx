import React from 'react';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { TextButton } from '../TextButton';
import { classNames } from '../../util/classnames';
import { range } from '../../util/range';
export interface PaginationInterface {
  currentPage: number;
  totalPages: number;
  goTo: (page: number) => void;
  next: () => void;
  previous: () => void;
}

function Pagination({
  currentPage,
  goTo,
  next,
  previous,
  totalPages,
}: PaginationInterface) {
  const bottomLimit = Math.max(
    Math.min(currentPage - 2, totalPages - 1 - 4 - 1),
    3
  );
  const upperLimit = Math.min(
    Math.max(currentPage + 2, 7),
    totalPages > 2 ? totalPages - 2 : 0
  );

  const pageArray = range(bottomLimit, upperLimit);

  return (
    <div className="mt-8">
      <div className="flex items-center gap-4 border-t-2 border-white-text py-1 sm:hidden">
        <button
          name={'Previous'}
          onClick={previous}
          className={classNames(
            'flex items-center justify-start gap-1 text-xl',
            currentPage === 1 ? 'hidden' : ''
          )}
        >
          <MdNavigateBefore size={32} /> Previous
        </button>
        <button
          name={'Next'}
          onClick={next}
          className={classNames(
            'flex items-center justify-start gap-1 text-xl',
            currentPage === totalPages ? 'invisible place-self-start' : ''
          )}
        >
          Next <MdNavigateNext size={32} />
        </button>
      </div>

      <div className="hidden items-center justify-center sm:flex">
        <nav className="flex flex-wrap items-center justify-center gap-y-2">
          <button
            disabled={currentPage === 1}
            type="button"
            className={classNames(
              'flex h-14 w-14 items-center justify-center rounded-l-xl border-2 border-gray-300 bg-dark-gray p-2 text-center',
              'z-20 hover:border-primary-blue hover:text-primary-blue',
              totalPages < 2 ? 'hidden' : '',
              currentPage === 1
                ? 'bg-dark-blue-custom hover:z-0 hover:border-gray-300 hover:text-white-text'
                : ''
            )}
            onClick={previous}
          >
            <MdNavigateBefore size={32} className=" " />
          </button>
          <button
            key={1}
            type="button"
            onClick={() => goTo(1)}
            className={classNames(
              'flex h-14 w-14 items-center justify-center  bg-dark-gray  py-2 px-4 text-center text-2xl',
              'hover:border-primary-blue hover:text-primary-blue',
              currentPage === 1
                ? ' scale-105 border-4 border-primary-blue text-primary-blue'
                : 'border-2 border-gray-300 text-gray-300'
            )}
          >
            {1}
          </button>
          {totalPages > 2 ? (
            bottomLimit - 1 === 2 ? (
              <button
                key={2}
                type="button"
                onClick={() => goTo(2)}
                className={classNames(
                  'flex h-14 w-14 items-center justify-center  bg-dark-gray  py-2 px-4 text-center text-2xl',
                  'hover:border-primary-blue hover:text-primary-blue',
                  currentPage === 2
                    ? ' scale-105 border-4 border-primary-blue text-primary-blue'
                    : 'border-2 border-gray-300 text-gray-300'
                )}
              >
                {2}
              </button>
            ) : (
              <p className="flex h-14 w-14 items-center justify-center p-2 text-2xl">
                ...
              </p>
            )
          ) : (
            <></>
          )}
          {pageArray.map((page, index) => (
            <button
              key={index}
              onClick={() => goTo(page)}
              type="button"
              className={classNames(
                'flex h-14 w-14 items-center justify-center  bg-dark-gray  py-2 px-4 text-center text-2xl',
                'hover:border-primary-blue hover:text-primary-blue',
                currentPage === page
                  ? ' scale-105 border-4 border-primary-blue text-primary-blue'
                  : 'border-2 border-gray-300 text-gray-300'
              )}
            >
              {page}
            </button>
          ))}
          {totalPages > 2 ? (
            upperLimit + 1 === totalPages - 1 ? (
              <button
                key={totalPages - 1}
                type="button"
                onClick={() => goTo(totalPages - 1)}
                className={classNames(
                  'flex h-14 w-14 items-center justify-center  bg-dark-gray  py-2 px-4 text-center text-2xl',
                  'hover:border-primary-blue hover:text-primary-blue',
                  currentPage === totalPages - 1
                    ? ' scale-105 border-4 border-primary-blue text-primary-blue'
                    : 'border-2 border-gray-300 text-gray-300'
                )}
              >
                {totalPages - 1}
              </button>
            ) : (
              <p className="flex h-14 w-14 items-center justify-center p-2 text-2xl">
                ...
              </p>
            )
          ) : (
            <></>
          )}
          {totalPages > 1 ? (
            <button
              key={totalPages}
              type="button"
              onClick={() => goTo(totalPages)}
              className={classNames(
                'flex h-14 w-14 items-center justify-center  bg-dark-gray  py-2 px-4 text-center text-2xl',
                'hover:border-primary-blue hover:text-primary-blue',
                currentPage === totalPages
                  ? ' scale-105 border-4 border-primary-blue text-primary-blue'
                  : 'border-2 border-gray-300 text-gray-300'
              )}
            >
              {totalPages}
            </button>
          ) : (
            <></>
          )}
          <button
            disabled={currentPage === totalPages}
            type="button"
            className={classNames(
              'flex h-14 w-14 items-center justify-center rounded-r-xl border-2 border-gray-300 bg-dark-gray p-2 text-center text-2xl',
              'z-20 hover:border-primary-blue hover:text-primary-blue',
              totalPages < 2 ? 'hidden' : '',
              currentPage === totalPages
                ? 'bg-dark-blue-custom hover:z-0 hover:border-gray-300 hover:text-white-text'
                : ''
            )}
            onClick={next}
          >
            <MdNavigateNext className=" " size={32} />
          </button>
        </nav>
      </div>
    </div>
  );
}

export default Pagination;
