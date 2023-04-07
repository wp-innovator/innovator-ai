type Props = {
    children: React.ReactNode;
    // @ts-ignore
    className?: React.CSSProperties['className'];
};

export default function SettingCard( { children, className }: Props ) {
	return (
		<div
			className={ `bg-white rounded shadow-sm p-5 pt-3 mb-5 ${ className }` }
		>
			{ children }
		</div>
	);
}
