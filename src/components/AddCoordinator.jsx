import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const AddCoordinator = () => {
  const AddCoordinatorSchema = [
    {
      key: 1,
      label: 'First Name',
      htmlFor: 'firstName',
      name: 'firstName',
      type: 'text',
      id: 'firstName',
      mainDivClassname: 'col-span-4 md:col-span-2',
      inputFieldClassName:
        'shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5',
      placeholder: 'Enter first name',
      validation: Yup.string().required('First Name is required'),
      initialValue: '',
    },
    {
      key: 2,
      label: 'Last Name',
      htmlFor: 'lastName',
      name: 'lastName',
      type: 'text',
      id: 'lastName',
      mainDivClassname: 'col-span-4 md:col-span-2',
      inputFieldClassName:
        'shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5',
      placeholder: 'Enter last name',
      validation: Yup.string().required('Last Name is required'),
      initialValue: '',
    },
    {
      key: 3,
      label: 'Email',
      htmlFor: 'email',
      name: 'email',
      type: 'email',
      id: 'email',
      mainDivClassname: 'col-span-4',
      inputFieldClassName:
        'shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5',
      placeholder: 'Enter email',
      validation: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
      initialValue: '',
    },
    {
      key: 4,
      label: 'National Code',
      htmlFor: 'nationalCode',
      name: 'nationalCode',
      type: 'number',
      id: 'nationalCode',
      mainDivClassname: 'col-span-4',
      inputFieldClassName:
        'shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5',
      placeholder: 'Enter national code',
      validation: Yup.string().required('National Code is required'),
      initialValue: '',
    },
    {
      key: 5,
      label: 'Phone Code',
      htmlFor: 'phoneCode',
      as: 'select',
      name: 'phoneCode',
      type: 'phoneCode',
      // id: 'phoneCode',
      mainDivClassname: 'col-span-4 md:col-span-1',
      inputFieldClassName:
        'shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5',
      placeholder: 'Enter phone code',
      options: [
        { key: 1, value: '', label: 'Select Code' }, // Default empty value
        { key: 2, value: '91', label: '+91' },
        { key: 3, value: '92', label: '+92' },
        { key: 4, value: '93', label: '+93' },
        { key: 5, value: '94', label: '+94' },
      ],
      validation: Yup.string().required('Phone Code is required'),
      initialValue: '',
    },
    {
      key: 6,
      label: 'Phone Number',
      htmlFor: 'phoneNumber',
      name: 'phoneNumber',
      type: 'number',
      id: 'phoneNumber',
      mainDivClassname: 'col-span-4 md:col-span-3',
      inputFieldClassName:
        'shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5',
      placeholder: 'Enter phone number',
      validation: Yup.string()
        .matches(/^\d{10}$/, 'Phone number must be 10 digits')
        .required('Phone Number is required')
        .nullable(),
      initialValue: '',
    },
    {
      key: 7,
      label: 'Date Of Birth',
      htmlFor: 'dateOfBirth',
      name: 'dateOfBirth',
      type: 'date',
      id: 'dateOfBirth',
      mainDivClassname: 'col-span-4',
      inputFieldClassName:
        'shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5',
      placeholder: 'Enter date of birth',
      validation: Yup.date().required('Date of Birth is required'),
      initialValue: '',
    },
    {
      key: 8,
      label: 'Country Name',
      htmlFor: 'countryName',
      as: 'select',
      name: 'countryName',
      // type: 'countryName',
      id: 'countryName',
      mainDivClassname: 'col-span-4',
      inputFieldClassName:
        'shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5',
      placeholder: 'Enter country name',
      options: [
        { key: 1, value: '', label: 'Select Country' }, // Default empty value
        { key: 2, value: 'India', label: 'India' },
        { key: 3, value: 'Bangladesh', label: 'Bangladesh' },
      ],
      validation: Yup.string().required('Country is required'),
      initialValue: '',
    },
    {
      key: 9,
      label: 'ID',
      htmlFor: 'ID',
      as: 'select',
      name: 'ID',
      // type: 'ID',
      id: 'ID',
      mainDivClassname: 'col-span-4',
      inputFieldClassName:
        'shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5',
      placeholder: 'Enter country name',
      options: [
        { key: 1, value: '', label: 'Select ID' }, // Default empty value
        { key: 2, value: 'IDA', label: 'IDA' },
        { key: 3, value: 'IDB', label: 'IDB' },
      ],
      validation: Yup.string().required('ID is required'),
      initialValue: '',
    },
    {
      key: 10,
      label: 'City Name',
      htmlFor: 'cityName',
      as: 'select',
      name: 'cityName',
      // type: 'cityName',
      id: 'cityName',
      mainDivClassname: 'col-span-4',
      inputFieldClassName:
        'shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5',
      placeholder: 'Enter country name',
      options: [
        { key: 1, value: '', label: 'Select City' }, // Default empty value
        { key: 2, value: 'Delhi', label: 'Delhi' },
        { key: 3, value: 'Gur', label: 'Gur' },
      ],
      validation: Yup.string().required('City is required'),
      initialValue: '',
    },
  ]
  const validationSchema = Yup.object(
    AddCoordinatorSchema.reduce((schema, field) => {
      if (field.validation) {
        schema[field.name] = field.validation
      }
      return schema
    }, {})
  )

  const initialValues = AddCoordinatorSchema.reduce((values, field) => {
    values[field.name] = field.initialValue || '' // Use defaultValue or fallback to an empty string
    return values
  }, {})

  const handleSubmit = (values) => {
    console.log('Form data===>', values)
  }

  return (
    <div>
      <div className="m-5">
        <div className="">
          <button className="bg-[#eaf7f3] text-[#1f546a] py-2 px-4 rounded-md shadow-md">
            Add Profile
          </button>
        </div>
      </div>
      <div className="flex justify-center">
        <h3 className="text-xl font-semibold">Add Coordinator</h3>
      </div>

      <div className="m-5 bg-white border-2 rounded-lg shadow border-gray-300">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, resetForm }) => (
            <Form>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-4 m-4">
                {AddCoordinatorSchema?.map((item) => (
                  <div key={item?.key} className={item?.mainDivClassname}>
                    <div>
                      <label
                        htmlFor={item?.htmlFor}
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        {item?.label}
                      </label>
                      {item?.as === 'select' ? (
                        <Field
                          as="select"
                          name={item?.name}
                          id={item?.id}
                          className={item?.inputFieldClassName}
                        >
                          {item?.options?.map((option) => (
                            <option key={option?.key} value={option?.value}>
                              {option?.label}
                            </option>
                          ))}
                        </Field>
                      ) : (
                        <Field
                          type={item?.type}
                          name={item?.name}
                          id={item?.id}
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                          placeholder={item?.placeholder}
                        />
                      )}
                      <ErrorMessage
                        name={item?.name}
                        component="p"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 justify-center md:justify-end m-4">
                <button
                  type="button" // Use type="button" to prevent triggering form submission
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 cursor-pointer"
                  onClick={() => resetForm()}
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="hover:bg-[#104e3d] text-white px-4 py-2 rounded-lg bg-[#25b992] cursor-pointer"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default AddCoordinator
