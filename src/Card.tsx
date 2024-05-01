import React from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";

import { User } from './interfaces'
import { Modal } from './Modal'

interface ICardProps {
  user: User,
  onImgLoad?: () => void
}

export const Card = ({user, onImgLoad}: ICardProps) => {
  const { avatar, firstname, lastname, description } = user;
  const fullname = firstname + ' ' + lastname;
  
  const onLoad = onImgLoad? onImgLoad: () => {};
  
  return (
    <div className="border-solid border-2 rounded-lg p-4 bg-white hover:bg-gray-50 text-center">
      <LazyLoadImage className="mx-auto mb-2" src={avatar} width={50} height={50} alt={fullname} onLoad={onLoad} onError={onLoad} />
      <div className="capitalize text-lg font-bold mb-2">{fullname}</div>
      <div className="line-clamp-3 text-lg mb-3">{description}</div>
      <Modal {...user} />
    </div>
  );
}
