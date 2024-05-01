import React from 'react';
import { User } from './interfaces'

interface IButtonProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

const ViewMoreButton = ({setShowModal}: IButtonProps) => (
  <button
    className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
    type="button"
    onClick={() => setShowModal(true)}
  >
    View More
  </button>
)

const TopRightXButton = ({setShowModal}: IButtonProps) => (
  <button
    className="p-1 ml-auto bg-transparent border-0 text-black opacity-80 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
    onClick={() => setShowModal(false)}
  >
    <span className="bg-transparent text-black opacity-80 h-6 w-6 text-2xl block outline-none focus:outline-none">
      ×
    </span>
  </button>
)

const CloseButton = ({setShowModal}: IButtonProps) => (
  <button
    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
    type="button"
    onClick={() => setShowModal(false)}
  >
    Close
  </button>
)

interface IBodyProps {
  firstname: string;
  lastname: string;
  avatar: string;
  role: string;
  join_date: string;
  description: string;
  email: string;
}

const Body = ({firstname, lastname, avatar, role, join_date, description, email}: IBodyProps) => {
  const fullname = firstname + ' ' + lastname;
  const url = new URL(avatar);
  url.searchParams.set('size', '200x200');
  url.searchParams.set('bgset', 'bg1');
  return (
    <>
      <img src={url.toString()} alt={fullname} width={200} height={200} />
      <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
        <strong>Role:</strong> {role} &nbsp;&nbsp; <strong>Joined:</strong> {join_date} &nbsp;&nbsp; <strong>Email:</strong> <a href={"mailto:"+email}>{email}</a>
      </p>
      <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
        {description}
      </p>
    </>
  );
}

export const Modal = (user: User) => {
  const [showModal, setShowModal] = React.useState(false);
  const { firstname, lastname } = user;
  
  return (
    <>
      <ViewMoreButton setShowModal={setShowModal} />
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="fixed inset-0" onClick={() => setShowModal(false)}></div>
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">{firstname} {lastname}</h3>
                  <TopRightXButton setShowModal={setShowModal} />
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <Body {...user}/>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <CloseButton setShowModal={setShowModal} />
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
