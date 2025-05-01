export default defineAppConfig({
    ui: {
      formField: {
        slots: {
          root: '',
          wrapper: '',
          labelWrapper: 'flex content-center items-center justify-between',
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
            base: '!bg-[#FAF9F6] border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-3 focus:ring-primary-500 focus:border-primary-500'
        }
      },
      textarea: {
        slots: {
            base: '!bg-[#FAF9F6] border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500'
        }
      },
      select: {
        slots: {
            base: '!bg-[#FAF9F6] border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500'
        }
      }
    }
  })
  