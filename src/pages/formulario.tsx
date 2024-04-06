/**
 * Formulário
 *
 * - Primeiramente vá até /src/pages/api/users/create.ts e implemente a API
 * - Deve ser implementado utilizando a lib react-hook-form
 * - O formulário deve ter os seguintes campos: nome, e-mail
 * - Os dois campos são obrigatórios e precisam de validação
 * - Ao dar 'submit', deve ser feito uma request para /api/users/create
 * - Lide com os possíveis erros
 */

import { useForm } from 'react-hook-form';
import styles from '@/styles/formulario.module.css';

type FormData = {
	name: string;
	email: string;
};

export default function Form() {
	const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

	const onSubmit = async (data: FormData) => {
		try {
			const response = await fetch('/api/users/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) throw new Error('Erro ao criar usuário');

			console.log('Usuário criado com sucesso');
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<input {...register('name', { required: true })} type="text" placeholder="Nome" />
					{errors.name && <p>O nome é requerido</p>}

					<input {...register('email', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} type="email" placeholder="Email" />
					{errors.email && <p>O email é requerido e deve ser um email válido</p>}

					<button type="submit" data-type="confirm">
						Enviar
					</button>
				</form>
			</div>
		</div>
	);
}