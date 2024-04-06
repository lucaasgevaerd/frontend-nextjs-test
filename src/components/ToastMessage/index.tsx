import { useEffect } from 'react';
import { useToast } from '@/contexts/ToastContext';

import { IToastMessage } from '@/types/toast-message.d';

import styles from './style.module.css';

type ToastMessageProps = {
	content: IToastMessage;
};

export const ToastMessage: React.FC<ToastMessageProps> = ({ content: data }) => {
	const { removeMessage } = useToast();

	useEffect(() => {
		const timer = setTimeout(() => {
			removeMessage(data.id);
		}, data.duration);

		return () => {
			clearTimeout(timer);
		};
	}, [data, removeMessage]);

	return (
		<div className={styles.container} data-toast-type={data.type} data-toast-id={data.id}>
			<span data-content>{data.message}</span>
			<span data-close onClick={() => removeMessage(data.id)}>╳</span>
		</div>
	);
};