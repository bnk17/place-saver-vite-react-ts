import clsx from 'clsx';
import { Modal, ModalOverlay } from 'react-aria-components';
import type { ModalOverlayProps } from 'react-aria-components';

export type ModalBaseProps = {
  children: React.ReactNode;
} & ModalOverlayProps;

export function ModalBase({ children, ...rest }: ModalBaseProps) {
  return (
    <ModalOverlay
      className={({ isEntering, isExiting }) =>
        clsx(
          'fixed inset-0 z-100 flex items-center justify-center overflow-y-auto bg-black/25 text-center backdrop-blur-xs',
          isEntering && 'animate-in fade-in duration-300 ease-out',
          isExiting && 'animate-out fade-out duration-200 ease-in'
        )
      }
      {...rest}
    >
      <Modal
        className={({ isEntering, isExiting }) =>
          clsx(
            'overflow-hidden rounded-lg bg-white shadow-xl',
            isEntering && 'animate-in zoom-in-95 duration-300 ease-out',
            isExiting && 'animate-out zoom-out-95 duration-200 ease-in'
          )
        }
      >
        {children}
      </Modal>
    </ModalOverlay>
  );
}
