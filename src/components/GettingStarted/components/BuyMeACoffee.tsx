import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Section } from './Section';
import { AccountIdenticon, useClickRef } from '@make-software/csprclick-ui';
import { SendResult } from '@make-software/csprclick-core-client';
import makeTransferDeploy from './transfer-deploy';
import Prism from 'prismjs';

export const StyledTD = styled.td(({ theme }) =>
	theme.withMedia({
		fontWeight: '600',
		margin: '4px 15px 4px 0',
		display: 'block',
	})
);

export const SpanTruncated = styled.span(({ theme }) =>
	theme.withMedia({
		display: 'inline-block',
		fontFamily: 'JetBrains Mono',
		width: ['150px', '350px', '100%'],
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	})
);
const AccountRow = styled.div(({ theme }) =>
	theme.withMedia({
		display: 'flex',
		flexDirection: 'row',
		gap: '8px',
		alignItems: 'center',
	})
);

export const BuyMeACoffee = () => {
	const [deployHash, setDeployHash] = useState<string | undefined>(undefined);
	const recipientPk = '0203596b49460de7900614b5e25a1fa1861b3eb944c42bea18fc7506b220fd4d9d61';

	const clickRef = useClickRef();
	const activeAccount = clickRef?.getActiveAccount();

	useEffect(() => {
		Prism.highlightAll();
	}, []);

	const handleSignTransaction = async () => {
		const sender = activeAccount?.public_key?.toLowerCase() || '';
		const deploy = makeTransferDeploy(sender, recipientPk, '50' + '000000000', 'casper-test');
		clickRef
			?.send(deploy, sender)
			.then((res: SendResult | undefined) => {
				if (res?.deployHash) {
					setDeployHash(res.deployHash);
					alert('Transaction sent successfully: ' + res.deployHash);
				} else if (res?.cancelled) {
					alert('Sign cancelled');
				} else {
					alert('Error in send(): ' + res?.error + '\n' + res?.errorData);
				}
			})
			.catch((err: any) => {
				alert('Error: ' + err);
				throw err;
			});
	};

	return (
		<>
			<Section withBackground>
				<table>
					<tbody>
						<tr>
							<StyledTD>Send:</StyledTD>
							<td>50 CSPR</td>
						</tr>
						<tr>
							<StyledTD>From:</StyledTD>
							<td>
								<i>your account {activeAccount?.public_key}</i>
							</td>
						</tr>
						<tr>
							<StyledTD>To:</StyledTD>
							<td>
								<AccountRow>
									<AccountIdenticon hex={recipientPk} size='sm' ></AccountIdenticon>
									<SpanTruncated>{recipientPk}</SpanTruncated>
								</AccountRow>
							</td>
						</tr>
						<tr>
							<td colSpan={2}>
								{activeAccount?.public_key && <button onClick={() => handleSignTransaction()}>Sign transaction</button>}
							</td>
						</tr>
					</tbody>
				</table>

				{deployHash && (
					<a href={`${clickRef?.appSettings?.csprlive_url}deploy/${deployHash}`} target='_blank' rel='noreferrer'>
						Check transfer status on CSPR.live
					</a>
				)}
			</Section>
		</>
	);
};
