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
        base: 'w-full !bg-white rounded-md border-0 placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 transition-colors',
          }
      },

      textarea: {
        slots: {
          base: [
            'w-full !bg-white rounded-md border-0 placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75',
            'transition-colors'
          ],        
        }
      },
      select: {
        slots: {
          base: [
          '!bg-white !text-default relative group rounded-md inline-flex items-center focus:outline-none disabled:cursor-not-allowed disabled:opacity-75',
          'transition-colors'
          ],
          content: 'bg-[#FAF9F6] max-h-60 w-(--reka-select-trigger-width) shadow-lg rounded-md ring ring-default overflow-hidden data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-select-content-transform-origin) pointer-events-auto',
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
      },
      switch: {
        slots: {
          thumb: 'group pointer-events-none rounded-full bg-no-repeat bg-center bg-contain shadow-lg ring-0 transition-transform duration-200 data-[state=unchecked]:translate-x-0 data-[state=unchecked]:rtl:-translate-x-0 flex items-center justify-center'
        }
      }
    }
  })
  