import { useNavigate } from "react-router";
import { FiHelpCircle, FiLogOut, FiUser } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { ROUTE_REGISTRY } from "../../routing/registry";
import Button from "./Button";

interface AvatarDropdownProps {
    open: boolean;
    onClose: () => void;
}

export function AvatarDropdown({ open, onClose }: AvatarDropdownProps) {
    const { user,logout } = useAuth();
    const navigate = useNavigate();
    const linkClassName = "flex items-center gap-2 rounded-md px-3 py-2.5 text-sm text-text-main hover:bg-surface-subtle";

    const handleLogout = async () => {
        onClose();
        await logout();
        navigate(ROUTE_REGISTRY.HOME.path);
    };

    if (!open) return null;

    return (
        <div id="account-dropdown" className="absolute right-0 top-full z-50 mt-2 w-64 max-w-[calc(100vw-2rem)] rounded-md border border-border-subtle bg-surface-base p-2 text-text-main shadow-lg">
            <nav aria-label="Account" className="flex flex-col gap-1">
                
                    <>
                        <p className="break-words px-3 py-2 text-sm text-text-muted">Hello, {user?.firstName || user?.email}</p>
                        <Button to={ROUTE_REGISTRY.PROFILE.path} variant="ghost" className={linkClassName} onClick={onClose}>
                            <FiUser aria-hidden="true" className="h-4 w-4 shrink-0" />
                            My profile
                        </Button>
                        <Button to={ROUTE_REGISTRY.HELP.path} variant="ghost" className={linkClassName} onClick={onClose}>
                            <FiHelpCircle aria-hidden="true" className="h-4 w-4 shrink-0" />
                            Help
                        </Button>
        
                        <hr className="my-1 border-border-subtle" />
                        <button type="button" className="flex items-center gap-2 rounded-md px-3 py-2.5 text-left text-sm font-medium text-danger hover:bg-danger-subtle" onClick={handleLogout}>
                            <FiLogOut aria-hidden="true" className="h-4 w-4 shrink-0" />
                            Log out
                        </button>
                    </>
              
            </nav>
        </div>
    );
}