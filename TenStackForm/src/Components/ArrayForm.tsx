import React from 'react';
import { useForm } from '@tanstack/react-form';

const ArrayForm: React.FC = () => {
  const form = useForm({
    defaultValues: {
      food: [] as string[],
    },
    onSubmit: async ({ value }) => {
      console.log('Form submitted:', value);
    },
  });

  return (
   
    <form onSubmit={(e) =>{e.preventDefault(); form.handleSubmit();}} >

        <form.Field name="food" mode="array"
          validators={{
            onChange: ({ value}) =>{
                       if (value.length<=0 ) {return 'Invalid food '}
                      }
           
        }}
        children={(field:any) => (
            <div>
              {field.state.value.map((_: any, i: number) => (
                <form.Field key={i} name={`food[${i}]`}
                validators={{
                    onChange: ({ value}) =>{
                               if (value.length<=0 ) {return 'Invalid food'}
                              }
                   
                }}
                 children={(subField) => (
                    <div>
                        <label>food {i}</label>
                        <input
                    className='inline-block'
                      value={subField.state.value}
                      onChange={(e:any) =>
                        subField.handleChange(e.target.value)
                      }
                    /> <button
                    type="button"
                    onClick={() => field.removeValue( i )}
                  >
                    Add Food
                  </button>
                  {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                  <p className="text-red-600 mt-1">{field.state.meta.errors}</p>
                )}
                    </div>
                  )}
                  
                />
              ))}<br/>
              <button
                type="button"
                onClick={() => field.pushValue( '' )}
              >
                Add Food
              </button>
            </div>
          )}
        />

<form.Subscribe
  selector={(state) => [state.canSubmit, state.isSubmitting]}
  children={([canSubmit, isSubmitting]) => (
    <button type="submit" disabled={!canSubmit}>
      {isSubmitting ? '...' : 'Submit'}
    </button>
  )}
/>
      </form>
   
  );
};

export default ArrayForm;
