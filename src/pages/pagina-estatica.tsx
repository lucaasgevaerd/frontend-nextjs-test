/**
 * Página estática
 *
 * - Atualmente o conteúdo é gerado no momento em que a requisição é feita
 * - Você deve transformar essa página em uma página estática
 * - A página deve ser gerada no momento da build
 * - A página deve ser atualizada a cada 1 minuto
 */

import { GetStaticProps } from 'next';
import styles from '@/styles/lista.module.css';
import { ICity } from '@/types/city.d';

type ListaProps = {
	list: ICity[];
};

export default function Lista({ list }: ListaProps) {
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<h2>Lista de cidades</h2>

				<div data-list-container>
					{list.map((city) => (
						<div data-list-item key={city.id}>
							{city.name}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const response = await fetch('http://localhost:8080/api/cities/10');
	const list = await response.json();

	return {
		props: { list },
		revalidate: 60,
	};
};