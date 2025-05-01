export default defineAppConfig({
    ui: {
      formField: {
        slots: {
          root: '',
          wrapper: '',
          labelWrapper: 'flex content-center items-center justify-start gap-2',
          label: 'block font-medium text-default',
          container: 'mt-1 relative',
          description: 'text-muted',
          error: 'mt-2 text-error',
          hint: 'text-muted',
          help: 'mt-2 text-muted'
        },
        variants: {
          size: {
            xs: {
              root: 'text-xs'
            },
            sm: {
              root: 'text-xs'
            },
            md: {
              root: 'text-sm'
            },
            lg: {
              root: 'text-sm'
            },
            xl: {
              root: 'text-base'
            }
          },
          required: {
            true: {
              label: "after:content-['*'] after:ms-0.5 after:text-error"
            }
          }
        },
        defaultVariants: {
          size: 'md'
        }
      },
      input: {
        slots: {
          base: '!bg-[#FAF9F6] border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-3 focus:ring-primary-500 focus:border-primary-500 text-black'  // Override the text color here
        }
      },

      textarea: {
        slots: {
            base: '!bg-[#FAF9F6] border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500'
        }
      },
      select: {
        slots: {
          base: '!bg-[#FAF9F6] !text-black border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 hover:bg-[#4B3A2A] hover:text-white',
          content: 'bg-[#FAF9F6] max-h-60 w-(--reka-select-trigger-width) shadow-lg rounded-md ring ring-default overflow-hidden data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-select-content-transform-origin) pointer-events-auto',
          item: [
            'bg-[#FAF9F6] text-black hover:bg-[#3F3F3F] hover:text-white group relative w-full flex items-center select-none outline-none before:absolute before:z-[-1] before:inset-px before:rounded-md',
            'data-disabled:cursor-not-allowed data-disabled:opacity-75',
            'data-highlighted:not-data-disabled:bg-[#3F3F3F] data-highlighted:not-data-disabled:text-white',
            'transition-colors before:transition-colors'
          ]
          
        }
      },
      radioGroup: {
        slots: {
          wrapper: 'flex flex-col gap-2',
          label: 'ml-2',
          item: 'flex items-center cursor-pointer'
        }
      },
      popover: {
        slots: {
          content: 'bg-white shadow-lg rounded-md ring ring-default p-4 max-w-xs text-sm text-gray-700 data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-[--reka-popover-content-transform-origin] focus:outline-none pointer-events-auto',
          arrow: 'fill-default'
        }
      }
      
      
      
    }
  })
  