import { forwardRef, useId, type SelectHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export interface SelectOption {
	value: string | number;
	label: string;
	disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
	options: readonly SelectOption[];
	label?: string;
	error?: string;
	helperText?: string;
	containerClassName?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
	(
		{
			options,
			label,
			error,
			helperText,
			className,
			containerClassName,
			id,
			'aria-describedby': ariaDescribedBy,
			'aria-invalid': ariaInvalid,
			...props
		},
		ref
	) => {
		const generatedId = useId();
		const selectId = id || generatedId;
		const messageId = `${selectId}-message`;
		const describedBy = [ariaDescribedBy, (error || helperText) ? messageId : undefined]
			.filter(Boolean)
			.join(' ') || undefined;

		return (
			<div className={cn('flex flex-col gap-1.5 w-full', containerClassName)}>
				{label && (
					<label htmlFor={selectId} className="text-sm font-medium text-text-main">
						{label}
					</label>
				)}
				<select
					{...props}
					id={selectId}
					ref={ref}
					aria-describedby={describedBy}
					aria-invalid={error ? true : ariaInvalid}
					className={cn(
						'w-full h-10 rounded-md border border-border-subtle bg-surface-base px-3 py-2 text-sm text-text-main transition-colors',
						'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
						'disabled:cursor-not-allowed disabled:bg-surface-subtle disabled:opacity-60',
						error && 'border-red-500 focus:ring-red-500 text-red-900',
						className
					)}
				>
					{options.map((option) => (
						<option key={option.value} value={option.value} disabled={option.disabled}>
							{option.label}
						</option>
					))}
				</select>
				{error ? (
					<p id={messageId} className="text-xs font-medium text-red-600">{error}</p>
				) : helperText ? (
					<p id={messageId} className="text-xs text-text-muted">{helperText}</p>
				) : null}
			</div>
		);
	}
);

Select.displayName = 'Select';
