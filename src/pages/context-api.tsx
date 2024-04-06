/**
 * Context Api
 *
 * - Criar um contexto para exibir mensagens de sucesso e erro
 * - Criar um componente para exibir as mensagens
 * - Criar um hook para disparar e consumir as mensagens
 * - Disparar as mensagens a partir dos botões abaixo
 */

import styles from '@/styles/context-api.module.css';
import { ToastMessage } from '@/components/ToastMessage';
import { ToastProvider, useToast } from '@/contexts/ToastContext';

export default function ContextApi() {
	return (
		<ToastProvider>
			<Buttons />
			<ToastContainer />
		</ToastProvider>
	);
}

function Buttons() {
	const { addMessage } = useToast();

	function handleSuccessButtonClick() {
		addMessage({
			id: Date.now().toString(),
			message: 'Mensagem de sucesso',
			type: 'success',
			duration: 4000,
		});
	}

	function handleErrorButtonClick() {
		addMessage({
			id: Date.now().toString(),
			message: 'Mensagem de erro',
			type: 'error',
			duration: 4000,
		});
	}

	return (
		<div className={styles.container}>
			<button type="button" onClick={handleSuccessButtonClick}>
				Disparar mensagem de sucesso
			</button>
			<button type="button" onClick={handleErrorButtonClick}>
				Disparar mensagem de erro
			</button>
		</div>
	);
}

function ToastContainer() {
	const { messages } = useToast();

	return (
		<div className={styles['toast-container']}>
			{messages.map((message) => (
				<ToastMessage key={message.id} content={message} />
			))}
		</div>
	);
}
